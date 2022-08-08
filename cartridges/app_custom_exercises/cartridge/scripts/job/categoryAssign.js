"use strict";

// imports
var Status = require("dw/system/Status");
var Logger = require("dw/system/Logger");
var ProductSearchModel = require("dw/catalog/ProductSearchModel");
var ProductMgr = require("dw/catalog/ProductMgr");
var ProductSearchHit = require("dw/catalog/ProductSearchHit");
var FileWriter = require("dw/io/FileWriter");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");
var File = require("dw/io/File");
/**
 * Create an XML file that asign all the products with brand "Apple" to category "electronics-mobile-phones".
 * @imput brand : String - brand parameter.
 * @param {dw.util.HashMap} brand which contain the brand parameter: "Apple".
 * @returns {dw.system.Status} - job status.
 */
function execute(args) {
    var brandName = args.brand;

    // if no brand parameter, exit job with ERROR
    if (empty(brandName)) {
        return new Status(Status.ERROR, "ERROR");
    }

    var statusOK = true;

    // find all products with brand: "Apple"
    var brandSearch = new ProductSearchModel();
    brandSearch.addRefinementValues("brand", brandName);
    brandSearch.search();
    var products = brandSearch.getProductSearchHits();
    var idProducts = [];
    var product;

    // insert all products with brand: "Apple" into idProducts array
    while (products.hasNext()) {
        product = products.next();
        idProducts.push(product.productID);
    }

    // create a file named: "CategoryAssign.xml" in path: IMPEX/src/
    var file = new File(File.IMPEX + "/src/CategoryAssign.xml");
    var fileWriter = new FileWriter(file, "UTF-8");
    var xsw = new XMLStreamWriter(fileWriter);

    // write the category assignments in CategoryAssign.xml with the same format as in catalog.xml
    xsw.writeStartDocument();
    xsw.writeStartElement("catalog");
    xsw.writeAttribute("xmlns", "http://www.demandware.com/xml/impex/catalog/2006-10-31");
    xsw.writeAttribute("catalog-id", "storefront-catalog-m-en");
    for (var i = 0; i < idProducts.length; i++) {
        xsw.writeStartElement("category-assignment");
        xsw.writeAttribute("category-id", "electronics-mobile-phones");
        xsw.writeAttribute("product-id", idProducts[i]);
        xsw.writeStartElement("primary-flag");
        xsw.writeCharacters("true");
        xsw.writeEndElement();
        xsw.writeEndElement();
    }
    xsw.writeEndElement();
    xsw.writeEndDocument();
    xsw.close();
    fileWriter.close();

    // show the job status
    if (statusOK) {
        return new Status(Status.OK, "OK");
    } else {
        return new Status(Status.ERROR, "ERROR");
    }
}

exports.execute = execute;
