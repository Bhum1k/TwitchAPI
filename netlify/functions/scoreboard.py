from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

url = "https://www.escapefromtarkov.com/streamer-challenge/scoreboard"

# Set up the WebDriver
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run in headless mode (no browser window)
driver = webdriver.Chrome(options=options)

# Load the initial page
driver.get(url)

# Wait for the dynamic content to load (adjust the timeout as needed)
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "tournamentTable")))

# Scroll to the bottom of the page to load more entries
while True:
    # Scroll to the bottom of the page
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait for the new content to load
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "tournamentTable")))

    # Check if there are more entries to load (adjust the class name accordingly)
    try:
        load_more_button = driver.find_element(By.CLASS_NAME, "load-more-button")
        load_more_button.click()
    except:
        # No more entries to load
        break

# Extract the data from the loaded page
tournament_table = driver.find_element(By.CLASS_NAME, "tournamentTable")
table_html = tournament_table.get_attribute("outerHTML")

# Now you can parse table_html using a HTML parsing library (e.g., BeautifulSoup)
html_content = table_html

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Find the table body
table_body = soup.find('tbody')

# Extract Nicknames from each row in the table
nicknames = []
for row in table_body.find_all('tr'):
    nickname_element = row.find('div', class_='col-2')

    # If col-2 is not directly under the row, traverse down the structure
    if not nickname_element:
        nested_div = row.find('div', class_='col-1')
        if nested_div:
            nickname_element = nested_div.find('div', class_='col-2')

    nickname = nickname_element.get_text(
        strip=True) if nickname_element else 'N/A'
    nicknames.append(nickname)

# Print the list of Nicknames
print(nicknames)
# Close the WebDriver
driver.quit()
