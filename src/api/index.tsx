import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_API_URL + "/search"
export interface StudentQueryParams {
    StudentId: string;
    AdvisorName: string;
    CourseName: string;
    AcademicYear: string;
    VisualType: string;
}export interface StudentApiResponse {
    studentId: string;
    academicYear: string;
    courseName: string;
    advisor: string;
    pdfUrl: string;
    imageUrls: string[];
}

export interface FlattenedPdfImage {
    pdfUrl: string;
    imageUrl: string;
}
export interface FlattenedPdfImage {
    pdfUrl: string;
    imageUrl: string;
}
export const flattenPdfImages = (
  data: StudentApiResponse[]
): FlattenedPdfImage[] => {
  return data.flatMap(item =>
    item.imageUrls.map(image => ({
      pdfUrl: item.pdfUrl,
      imageUrl: image
    }))
  );
};
export const fetchStudentData = async ({
    StudentId,
    AdvisorName,
    CourseName,
    AcademicYear,
    VisualType
}: StudentQueryParams) => {
    try {
        const response = await axios.get(
            BACKEND_API_URL,
            {
                params: {
                    StudentId,
                    AdvisorName,
                    CourseName,
                    AcademicYear,
                    VisualType
                }
            }
        );

        console.log(response);
        return response.data;

    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};