import sys
from bs4 import BeautifulSoup

def extract_text_from_html(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove style and script tags
        for tag in soup(['style', 'script']):
            tag.decompose()
        
        # Extract text from the body tag if it exists, otherwise from the whole document
        if soup.body:
            text = soup.body.get_text(separator=' ', strip=True)
        else:
            text = soup.get_text(separator=' ', strip=True)
        
        # Clean up extra whitespaces
        text = ' '.join(text.split())
        
        return text
    except FileNotFoundError:
        return f"Error: File '{file_path}' not found."
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python extract_text.py <html_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    extracted_text = extract_text_from_html(file_path)
    print(extracted_text)