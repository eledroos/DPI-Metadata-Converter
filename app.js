document.getElementById('convertButton').addEventListener('click', async function() {
    const fileInput = document.getElementById('uploadImage');
    const dpiInput = document.getElementById('desiredDpi');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload an image first.');
        return;
    }

    // Handle HEIC files
    let imageFile = file;
    let fileName = file.name;

    if (file.type === 'image/heic' || file.type === 'image/heif') {
        try {
            const conversionResult = await heic2any({
                blob: file,
                toType: 'image/jpeg',
            });
            imageFile = conversionResult;
            fileName = file.name.replace(/\.[^/.]+$/, ".jpg"); // Change extension to .jpg
        } catch (error) {
            console.error('HEIC conversion error:', error);
            alert('Error converting HEIC image.');
            return;
        }
    }

    const desiredDpi = dpiInput.value ? parseInt(dpiInput.value, 10) : 75; // Default to 75 if no input

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(event) {
        img.src = event.target.result;
    };

    img.onload = function() {
        const canvas = document.getElementById('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(async function(blob) {
            const base64Image = await blobToBase64(blob);
            const exifObj = piexif.load(base64Image);

            // Set the DPI in EXIF metadata
            exifObj["0th"][piexif.ImageIFD.XResolution] = [desiredDpi, 1]; // Set XResolution to desired DPI
            exifObj["0th"][piexif.ImageIFD.YResolution] = [desiredDpi, 1]; // Set YResolution to desired DPI
            exifObj["0th"][piexif.ImageIFD.ResolutionUnit] = 2; // Set ResolutionUnit to inches

            const modifiedExif = piexif.dump(exifObj);
            const modifiedBase64 = piexif.insert(modifiedExif, base64Image);

            // Convert back to Blob and prepare for download
            const modifiedBlob = base64ToBlob(modifiedBase64, 'image/jpeg');

            // Check the DPI and display it
            const finalExif = piexif.load(modifiedBase64);
            const xDpi = finalExif["0th"][piexif.ImageIFD.XResolution] ? finalExif["0th"][piexif.ImageIFD.XResolution][0] : "Unknown";
            const yDpi = finalExif["0th"][piexif.ImageIFD.YResolution] ? finalExif["0th"][piexif.ImageIFD.YResolution][0] : "Unknown";

            document.getElementById('dpiInfo').innerText = `DPI: ${xDpi}x${yDpi}`;

            const url = URL.createObjectURL(modifiedBlob);
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = url;
            downloadLink.download = 'converted_' + fileName;
            downloadLink.style.display = 'block';
            downloadLink.textContent = 'Download Converted Image';

        }, 'image/jpeg');
    };

    reader.readAsDataURL(imageFile);
});

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function base64ToBlob(base64, contentType) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: contentType });
}
