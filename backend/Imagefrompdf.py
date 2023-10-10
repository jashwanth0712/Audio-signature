import fitz  # PyMuPDF
import os


def pdf_to_images(pdf_path, output_dir, dpi=300):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Open the PDF file
    pdf_document = fitz.open(pdf_path)

    image_paths = []

    # Iterate through each page of the PDF
    for page_number in range(pdf_document.page_count):
        page = pdf_document.load_page(page_number)

        # Convert the page to an image
        pix = page.get_pixmap(matrix=fitz.Matrix(dpi / 72, dpi / 72))

        # Save the image with a unique name in the output directory
        image_path = os.path.join(output_dir, f"page_{page_number + 1}.png")
        pix.save(image_path)

        image_paths.append(image_path)

    # Close the PDF file
    pdf_document.close()

    return image_paths
