import { JSDOM } from "jsdom";


interface StudentDetails {
	username: string;
	fullName: string;
	institution: string;
	dateOfExamination: string;
	stream: string;
	remedialExamDetails: {
	  subject: string;
	  result: number;
	}[];
	total: string;
  }
  
  function parseTableToJSON(html: string): StudentDetails | null {
	const { document } = new JSDOM(html).window;
	const rows = document.querySelectorAll("table tbody tr");
  
	if (!rows.length) {
	  return null;
	}
  
	const studentDetails: StudentDetails = {
	  username: "",
	  fullName: "",
	  institution: "",
	  dateOfExamination: "",
	  stream: "",
	  remedialExamDetails: [],
	  total: "",
	};
  
	rows.forEach((row, index) => {
	  const cells = row.querySelectorAll("td, th");
  
	  if (cells.length < 4) {
		return;
	  }
  
	  switch (index) {
		case 1:
		  studentDetails.username = cells[1]?.textContent?.trim() || "";
		  break;
		case 2:
		  studentDetails.fullName = cells[1]?.textContent?.trim() || "";
		  studentDetails.remedialExamDetails.push({
			subject: cells[2]?.textContent?.trim() || "",
			result: parseFloat(cells[3]?.textContent?.trim() || "0"),
		  });
		  break;
		case 3:
		  studentDetails.institution = cells[1]?.textContent?.trim() || "";
		  studentDetails.remedialExamDetails.push({
			subject: cells[2]?.textContent?.trim() || "",
			result: parseFloat(cells[3]?.textContent?.trim() || "0"),
		  });
		  break;
		case 4:
		  studentDetails.dateOfExamination = cells[1]?.textContent?.trim() || "";
		  studentDetails.remedialExamDetails.push({
			subject: cells[2]?.textContent?.trim() || "",
			result: parseFloat(cells[3]?.textContent?.trim() || "0"),
		  });
		  break;
		case 5:
		  studentDetails.stream = cells[1]?.textContent?.trim() || "";
		  studentDetails.remedialExamDetails.push({
			subject: cells[2]?.textContent?.trim() || "",
			result: parseFloat(cells[3]?.textContent?.trim() || "0"),
		  });
		  break;
		case 6:
		  studentDetails.total = cells[3]?.textContent?.trim() || "";
		  break;
	  }
	});
  
	return studentDetails;
  }