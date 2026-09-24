from PIL import Image
import os
import glob

def recolor_image(file_path, target_color):
    try:
        img = Image.open(file_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # item is (R, G, B, A)
            if item[3] > 0: # If pixel is not fully transparent
                # Keep original alpha, but change RGB
                new_data.append((target_color[0], target_color[1], target_color[2], item[3]))
            else:
                new_data.append(item)

        img.putdata(new_data)
        
        # Save back, replacing original
        img.save(file_path)
        print(f"Recolored {file_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

target = (11, 52, 146) # #0B3492

# Recolor logo.png and logo.webp (save as png then convert if needed, but PIL handles webp)
recolor_image("logo.png", target)
recolor_image("logo.webp", target)
recolor_image("LOGO 1X1.png", target)
recolor_image("LOGO 1X1.webp", target)
