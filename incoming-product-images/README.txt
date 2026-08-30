PROJECT ATLAS PRODUCT IMAGE DROP FOLDER

1. Use the product slug as the filename.
   Example: apple-macbook-air-13-m5.jpg

2. Supported input formats:
   JPG, JPEG, PNG, WEBP, AVIF

3. Put the images in this folder, then run:
   npm run images:import

4. The importer converts every matched image to optimized WEBP in:
   public/products/<slug>.webp

5. Then run:
   npm run images:audit
   npm run build

Use product imagery you have permission to publish, such as manufacturer/retailer assets whose terms permit your use or images you own/licensed.
