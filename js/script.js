
/*jshint esversion: 6 */

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Global variables

const page = document.querySelector('.page');
const fullStudentList = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('.page-header');

const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const pageButtonsDiv = document.createElement('div');
const pageButtonsUl = document.createElement('ul');
const noResultsDiv = document.createElement('div');

let searchString = '';
let filteredStudentList = [];
const maxStudentsPerPage = 10;

// Append elements for search bar feature
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchDiv.appendChild(searchInput);
pageHeader.appendChild(searchDiv);

// Append elements for pagination buttons
pageButtonsDiv.className = 'pagination';
pageButtonsDiv.appendChild(pageButtonsUl);
page.appendChild(pageButtonsDiv);

// Append element to display if no students match search
noResultsDiv.textContent = 'No Match Found';
noResultsDiv.style.fontSize = '1.5rem';
noResultsDiv.style.margin = '4rem';
noResultsDiv.style.textAlign = 'center';
noResultsDiv.style.display = 'none';
page.appendChild(noResultsDiv);

// Hide all students in list except for those you want to show
const showPage = (list, button) => {
	// Set all students to display none
	for(let i = 0; i < fullStudentList.length; i++) {
		fullStudentList[i].style.display = 'none';
	}
	// If no results, display message
	if(list.length === 0) {
		noResultsDiv.style.display = 'block';
	}
	// else display students and the page button selection
	else {
		let indexStart = ((button - 1) * maxStudentsPerPage);
		let indexEnd = (indexStart + maxStudentsPerPage);
		for(let i = indexStart; i < indexEnd && i < list.length; i++) {
			list[i].style.display = 'block';
		}
		noResultsDiv.style.display = 'none';
	}
};

// Generate, append and add functionality to pagination buttons
const appendPageLinks = (studentList) => {
	let numStudents = studentList.length;
	let numPages = Math.ceil(numStudents / maxStudentsPerPage);
	let selectedButton = 1;
	pageButtonsUl.innerHTML = '';

	showPage(studentList, selectedButton);

	// Create new button for each page
	for(let i = 0; i < numPages; i++) {
		let button = document.createElement('li');
		let anchor = document.createElement('a');
		anchor.href = '#';
		// Make first button active
		if(i === 0) {
			anchor.className = 'active';
		}
		// Buttons text will start at 1 instead of 0
		anchor.textContent = i + 1;
		button.appendChild(anchor);
		pageButtonsUl.appendChild(button);
	}

	// Update page when new page button clicked
	pageButtonsUl.addEventListener('click', (e) => {
		let previousButton = document.querySelector('.active');
		previousButton.className = '';
		selectedButton = e.target.textContent;
		e.target.className = 'active';
		showPage(studentList, selectedButton);
	});
};

// Update filteredStudentList using search and refresh page
const newQuery = () => {
	filteredStudentList = [];
	if(searchString.length === 0) {
		// Use fullStudentList if searchString is empty
		appendPageLinks(fullStudentList);
	} else {
		// For each item in the full student list
		for(let i = 0; i < fullStudentList.length; i++) {
			// Select the student's name as a string
			let name = fullStudentList[i].querySelector('h3').textContent;
			// If the student's name contains the search query substring
			if(name.includes(searchString)) {
				// Add student item HTML to filteredStudentList
				filteredStudentList.push(fullStudentList[i]);
			}
		}
		appendPageLinks(filteredStudentList);
	}
};

// Call search() function when input value changes
searchInput.addEventListener('input', () => {
	searchString = searchInput.value;
	newQuery();
});

// Call when file is initially loaded
appendPageLinks(fullStudentList);
