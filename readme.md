# DPI Metadata Converter

## Overview

This **DPI Metadata Converter** is a privacy-preserving web tool designed to modify the DPI (dots per inch) metadata of image files. This tool was created in response to certain online systems, such as Pennsylvania's voter registration system, which require images to have a specific DPI setting for upload. The tool operates entirely within the user's web browser, ensuring that no data is transmitted to external servers.

## Why This Tool Was Needed

In Pennsylvania, residents who do not have a driver's license and attempt to register to vote online are required to upload a scanned image of their signature. However, the system imposes an arbitrary requirement that the image must have a minimum DPI of 75. 

This requirement is problematic for several reasons:
- **Misunderstanding of DPI**: DPI (dots per inch) is a measure used primarily for print resolution, not digital images displayed on screens. Most modern smartphones, which are commonly used to capture images, do not inherently manage or label images by DPI because it is irrelevant for digital display.
- **Default DPI in Smartphones**: Many smartphones save images with metadata that defaults to 72 DPI, which is common for screen resolution but doesn’t align with Pennsylvania’s 75 DPI requirement.
- **Technical Barrier**: The arbitrary DPI requirement can prevent eligible voters from completing their registration if they do not have the technical know-how to modify image metadata, potentially leading to disenfranchisement.

The DPI Metadata Converter was developed to address this issue by providing an easy-to-use tool that allows users to adjust the DPI metadata of their images to meet Pennsylvania's requirements, without needing specialized software or advanced technical knowledge.

## Features

- **Privacy-Preserving**: All image processing is done locally on the user's device. No data is sent to external servers, ensuring that the user's privacy is fully protected.
- **DPI Adjustment**: The tool allows users to modify the DPI metadata of their images to a default of 75 DPI, or a custom DPI value specified by the user.
- **HEIC to JPEG Conversion**: The tool automatically converts HEIC images to JPEG format for compatibility with systems that may not support HEIC files.
- **User-Friendly**: The tool provides a simple interface for users to upload images, modify their DPI, and download the modified files.

## How It Works

### 1. Image Upload

Users start by uploading an image file through the file input element. The image file is read using the JavaScript `FileReader` API, which converts the file into a Data URL format. This allows the tool to process the image entirely within the web browser.

### 2. Optional DPI Input

The tool provides an input field where users can specify a desired DPI value. If the user does not specify a value, the tool defaults to 75 DPI.

### 3. Image Processing

The image processing workflow involves several key steps:

- **File Conversion (if necessary)**: If the uploaded image is in HEIC format (commonly used by iPhones), the tool converts it to JPEG using the `heic2any` library. This ensures compatibility with systems that may require JPEG format.
- **Canvas Rendering**: The image is rendered onto an HTML5 `<canvas>` element using the `drawImage` method, allowing the tool to manipulate the image data.
- **DPI Modification**: The canvas content is converted into a Blob and then into a base64 string. The EXIF metadata is extracted using the `piexifjs` library, where the DPI values are modified. The modified EXIF data is then reinserted into the image.

### 4. Privacy-Preserving Processing

All of the above operations are performed entirely within the user's web browser. No data is sent to external servers, and no data is stored or transmitted outside of the user's local machine. This ensures complete privacy and security.

### 5. DPI Display and Download

After the DPI has been modified, the tool displays the new DPI values on the page. Users can then download the modified image file directly to their device with the updated DPI settings.

## Libraries Used

The following libraries are used in this project:

- **[pica](https://cdnjs.cloudflare.com/ajax/libs/pica/9.0.1/pica.min.js)**: A high-quality image resizing library that helps with rendering images onto a canvas.
- **[heic2any](https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.1/index.min.js)**: A library that converts HEIC images to JPEG format, ensuring compatibility with a wider range of systems.
- **[piexifjs](https://cdn.jsdelivr.net/npm/piexifjs)**: A library used to read, modify, and write EXIF metadata in image files. This is essential for setting the DPI values in the image's metadata.

## Usage

To use the DPI Metadata Converter, simply upload an image, optionally enter your desired DPI value, and click the "Convert DPI" button. The tool will process the image, modify its DPI metadata, and provide you with a link to download the modified image.

## Privacy Statement

This tool was created with privacy in mind. All image processing happens locally on your device, ensuring that no data is transmitted to any external servers. Your image files and any modifications you make are fully under your control.

## License

This project is open-source and released under the [MIT License](LICENSE). You are free to use, modify, and distribute this code as you see fit.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please open an issue or submit a pull request.

## Contact

If you have any questions or concerns, feel free to reach out:

- Email: nassers@protonmail.com
- GitHub: @eledroos