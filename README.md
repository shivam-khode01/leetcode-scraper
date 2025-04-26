# LeetCode Scraper :  Profile Viewer 

A web application that allows users to view and download their LeetCode profile information, including stats, avatar, and problem-solving details. It provides visual representations of your progress with downloadable images and PDFs for easy sharing and tracking.

## Features

- **Profile Overview**: Display key information such as username, ranking, reputation, and location.
- **Problem Solving Stats**: View problem-solving distribution across different difficulty levels (Easy, Medium, Hard).
- **Visual Charts**: Visualize your LeetCode stats with a doughnut chart powered by Chart.js.
- **Download Options**: Easily download your profile information as an image or PDF.
- **Responsive Design**: Fully mobile-friendly with Bootstrap 5 and Tailwind CSS for a sleek interface.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, Bootstrap 5, Tailwind CSS, Chart.js
- **Libraries**:
  - `html2canvas`: For converting HTML content to images.
  - `jsPDF`: For generating downloadable PDFs.
  - Bootstrap 5: Responsive design framework for UI components.
  - Tailwind CSS: Utility-first CSS framework for styling and theme management.

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/leetcode-profile-viewer.git
```
2. Install dependencies
Navigate to the project folder and install the required dependencies:

```bash
npm install express html2canvas jspdf chart.js bootstrap tailwindcss

```
3. Run the application
After installing the dependencies, you can start the application:

```bash
node app.js
```
By default, the app will run on http://localhost:3000.
Usage
Enter your LeetCode username: In the input field, type your LeetCode username to fetch your profile.

View Profile Information: Once your username is entered, your LeetCode profile details will be displayed, including stats and charts.

Download Options: After viewing your profile, you can download the profile data as an image or PDF by clicking the respective download button.

Contributing
We welcome contributions to this project! If you'd like to improve or add new features, feel free to fork the repository, make changes, and submit a pull request.

Steps for contributing:
Fork the repository.

Create a new branch 
```bash
(git checkout -b feature-name).
```
Make your changes.

Commit your changes
```bash
(git commit -am 'Add new feature').
```
Push to the branch 
```bash(
git push origin feature-name).
```
Create a pull request.


Made with ❤️ by shivam khode
