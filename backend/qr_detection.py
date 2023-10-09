from qreader import QReader
import cv2

def qr_to_url(req_path: str)->tuple:
    # Create a QReader instance
    qreader = QReader()

    # Get the image that contains the QR code
    image = cv2.cvtColor(cv2.imread(req_path), cv2.COLOR_BGR2RGB)

    # Use the detect_and_decode function to get the decoded QR data
    decoded_text = qreader.detect_and_decode(image=image)

    return decoded_text