from gimpfu import *
import os

CROP_WIDTH = 800
CROP_HEIGHT = 600
CROP_ORIGIN_X = 0
CROP_ORIGIN_Y = 0
INPUT_DIR = "./webapp/public/assets/images/"
OUTPUT_DIR = "./webapp/public/assets/images/webp"

def batch_crop_export_to_webp():
    for filename in os.listdir(INPUT_DIR):
        if filename.lower().endswith((".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff")):
            input_path = os.path.join(INPUT_DIR, filename);
            output_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(OUTPUT_DIR, output_filename)

            image = pdb.gimp_file_load(input_path, input_path)
            layer = pdb.gimp_image_get_active_layer(image);
            CROP_WIDTH = image.width;

            # Crop image to sive - slicing off the bottom
            pdb.gimp_image_crop(image, CROP_WIDTH, CROP_HEIGHT, CROP_ORIGIN_X, CROP_ORIGIN_Y)

            # Export image as webp
            pdb.file_webp_save(image, layer, output_path, output_path, 1, 0, 1, 0, 0, 1, 0, 0)
            pdb.gimp_image_delete(image);
            
register(
    "python_fu_batch_crop_export_to_webp",
    "Batch crop and export to webp",
    "Batch crop and export to webp",
    "David Charles", "David Charles", "2025"
    "", "", [], [],
    batch_crop_export_to_webp
)

main()
