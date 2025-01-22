import easyocr

def reed_text_from_image(file_path):
    reader = easyocr.Reader(['pt'])
    
    result = reader.readtext(file_path, detail=0)  
    
    print("Texto extraído da imagem:")
    for text in result:
        print(text)
    
    return result


reed_text_from_image('./read-image1.png')
# reed_text_from_image('./read-image2.png')
