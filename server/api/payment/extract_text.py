import PyPDF2
from io import BytesIO

def extract_textt(pdf_file, keywords):
    
    # Open the PDF file
        file_content = pdf_file.read()

  # Create a BytesIO object from the in-memory content
        file_stream = BytesIO(file_content)

  # Use PyPDF2 to read the PDF from the BytesIO stream
        reader = PyPDF2.PdfReader(file_stream)
        results = {keyword: [] for keyword in keywords}  # Initialize results dictionary for each keyword

        # Iterate through each page
        for page in reader.pages:
            text = page.extract_text()
            if text:
                for keyword in keywords:
                    index = text.find(keyword)
                    if index != -1:
                        # Start extracting text right after the keyword
                        start = index + len(keyword)
                        end = text.find('.', start)  # Look for the next space character after the keyword
                        if end == -1:  # No space found, take the rest of the text
                            end = len(text)
                        extracted_text = text[start:end].strip()  # Extract the text and strip any leading/trailing whitespace
                        results[keyword].append(extracted_text)

        return results


