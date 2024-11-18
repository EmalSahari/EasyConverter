document.getElementById('convert').addEventListener('click', async function() {
    const fileInput = document.getElementById('upload');
    const conversionType = document.getElementById('conversion-type').value;

    if (fileInput.files.length === 0) {
        alert('Please select a file to convert.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const img = new Image();

        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let downloadLink = document.getElementById('download');
            if (conversionType === 'png' || conversionType === 'webp-png' || conversionType === 'heic-png') {
                downloadLink.href = canvas.toDataURL('image/png');
                downloadLink.download = 'converted.png';
            } else {
                downloadLink.href = canvas.toDataURL('image/jpeg', 0.9);
                downloadLink.download = 'converted.jpg';
            }

            downloadLink.style.display = 'block';
        };

        img.src = e.target.result;
    };

    if (conversionType.includes('heic') || conversionType.includes('webp')) {
        alert('HEIC and WebP conversion support requires additional backend or advanced browser-based libraries.');
        return;
    }

    reader.readAsDataURL(file);
});
