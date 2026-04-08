import React, { useState } from "react";
import "../../src/assets/styles/searchSection.css"
import { fetchStudentData, flattenPdfImages, StudentQueryParams } from "../../src/api";
import Select from "react-select";

export const courseOptions: string[] = [
    "All",
    "גדול'סמסטר א-",
    "גדול | סימן בטבע",
    "גדול",
    "קטן",
    "גדול סמסטר א",
    "גדול | שנה ב’ סמסטר ב",
    "גדולI ’סמסטר א",
    "גדול שנה א‘ סמסטר א‘  |  שברי זמן",
    "גדול סמסטר א הגשה סופית",
    "גדול | גרידים",
    "גדול-סמסטר א׳",
    "במהלך שרכשתי טכניקות",
    "לוי ואפרת מן’תורג טליה-מנחות",
    "סדנה",
    "סופית מטלה    29 שקופית",
    "גדול| ענפים ואבנים",
    "לוי אפרת ,תורג׳מן טליה | מנחות",
    "גדול וסטודיו קטן שנה א סימסטר א",
    "גדול- 1 יסודות העיצוב",
    "גדול סמסטר א'",
    "ציור",
    ": עיצוב פנים",
    "קטן :סימסטר א",
    "למדתי את יסודות השרטוט",
    "גדול |",
    "גדול | סמסטר א",
    "גדול סמסטר א׳",
    "גדול סמסטר א׳-סימן בנוי",
    "|רישום ושרטוט",
    "גדול סמסטר ב",
    "’א שנה",
    "גדול-’סמסטר א",
    "ציור ורישום",
    "גדול | שנה א סמסטר א",
    "גדול.- ... חלל ו-  ביניים+  הגשה ראשונה-1",
    "מידול 10",
    "גדול | שנה א",
    "גדול- סמסטר א",
    "ציור ,",
    "Studio",
    "סטודיו גדול, סמסטר א",
    "קטן -הגשה סופית סמסטר א׳",
    "גדול שנה א",
    "רישום",
    "גדול-סמסטר א׳-שנה א׳",
    "-’א סמסטר",
    "גדול- ’סמסטר א",
    "גדול/סמסטר א'-מנחות :מיכל כהן ,",
    "גדול תרגיל",
    "גדול סמסטר א-יסודות העיצוב",
    "גדול סטודיו 'א ס מ ס ט ר'א ס מ ס ט ר",
    "גדול ורישום שרטוט ותיעוד",
    "גדול–סמסטר א'",
    "לעיצוב פנים"
];

export const advisorOptions: string[] = [
    "All",
    "Ilan Garibi",
    "Yaron Eliasi",
    "Asher Elbaz",
    "Avihai Tadmor",
    "Avichai Tadmor",
    "Gal Gaon",
    "Tamar Lev On",
    // "I Big Studio I Semester 1",
    "Yoram Nidam",
    "Turgeman Weinstein Talia",
    "Levi Efrat",
    "Shir Bardon",
    "Talia Turgeman",
    "Golan Hadari",
    "Mayan Eliman",
    "Efrat Levy",
    "Talia Turgeman Weinstein",
    // "losing track of time",
    // "blueprints",
    "Sharon Ella",
    "Nidam Yoram",
    "Tadmor Avichai",
    "Michal Cohen",
    "Elbez Asher",
    // "A built-in mid-submission mark",
    "Taliosef Orli",
    "Gaon Gal",
    "interpreter Weinstein Talia"
];

const imageTypeOptions = [
    { value: "all", label: "All" },
    { value: "Plan", label: "Drawing / Plan" },
    { value: "Render", label: "Computer Imaging (Render)" },
    { value: "Model", label: "Physical model" },
    { value: "Photo", label: "Photo / Other" },
    { value: "Sketch", label: "Sketch" },
];

const SearchSection = () => {

    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        advisor: "",
        course: "",
        startYear: "",
        endYear: "",
        studentId: "",
        imageType: "",
    });
    const advisorSelectOptions = advisorOptions.map((advisor) => ({
        value: advisor,
        label: advisor,
    }));

    const courseSelectOptions = courseOptions.map((course) => ({
        value: course,
        label: course,
    }));
    const [errors, setErrors] = useState({
        studentId: "",
    });

    const years = [];
    for (let y = 2015; y <= 2026; y++) {
        years.push(y);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = async () => {
        setIsLoading(true);
        const idRegex = /^\d{9}$/;
        let newErrors = {};

        if (filters.studentId && !idRegex.test(filters.studentId)) {
            newErrors.studentId =
                "Student ID must contain exactly 9 digits.";
        }


        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        console.log("Search Filters:", filters);


        try {

            const query: StudentQueryParams = {
                StudentId: filters.studentId,
                AdvisorName: filters.advisor === "All" ? "" : filters.advisor,
                CourseName: filters.course === "All" ? "" : filters.course,
                AcademicYear: filters.startYear,
                VisualType: filters.imageType === "all" ? "" : filters.imageType
            };


            const rawData = await fetchStudentData(query);

            const flattenedData = flattenPdfImages(rawData);
            setResults(flattenedData)
            console.log(flattenedData);
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <section className="search">
            {/* LEFT FILTER PANEL */}
            <div className="search__filters">
                <h2 className="search__title">Filter Projects</h2>

                {/* Advisor */}
                <div className="form-group">
                    <label>Advisor Name</label>
                    <Select
                        options={advisorSelectOptions}
                        value={advisorSelectOptions.find(
                            (o) => o.value === filters.advisor
                        )}
                        onChange={(selected) =>
                            setFilters((prev) => ({
                                ...prev,
                                advisor: selected?.value || "",
                            }))
                        }
                        placeholder="Select advisor..."
                        isSearchable
                        isClearable
                    />
                </div>
                {/* Course */}
                <div className="form-group">
                    <label>Course Name</label>
                    <Select
                        options={courseSelectOptions}
                        value={courseSelectOptions.find(
                            (o) => o.value === filters.course
                        )}
                        onChange={(selected) =>
                            setFilters((prev) => ({
                                ...prev,
                                course: selected?.value || "",
                            }))
                        }
                        placeholder="Select course..."
                        isSearchable
                        isClearable
                    />
                </div>
                {/* Years */}
                {/* <div className="form-group">
                    <label>Project Year</label>

                    <select
                        name="startYear"
                        value={filters.startYear}
                        onChange={(e) => {
                            handleChange(e);
                            setFilters((prev) => ({
                                ...prev,
                                endYear: "", // reset endYear when start changes
                            }));
                        }}
                    >
                        <option value="">From Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    {filters.startYear && (
                        <select
                            name="endYear"
                            value={filters.endYear}
                            onChange={handleChange}
                        >
                            <option value="">To Year</option>
                            {years
                                .filter((y) => y >= filters.startYear)
                                .map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                        </select>
                    )}
                </div> */}

                {/* Student ID */}
                <div className="form-group">
                    <label>Student ID</label>

                    <div className={`input-icon ${errors.studentId ? "input-error" : ""}`}>
                        <span className="icon">🎓</span>
                        <input
                            type="text"
                            name="studentId"
                            value={filters.studentId}
                            maxLength={9}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "");
                                setFilters((prev) => ({
                                    ...prev,
                                    studentId: onlyNumbers,
                                }));

                                // Clear error when user fixes input
                                if (errors.studentId) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        studentId: "",
                                    }));
                                }
                            }}
                            placeholder="Enter 9-digit student ID"
                        />
                    </div>

                    {errors.studentId && (
                        <span className="error-text">
                            {errors.studentId}
                        </span>
                    )}
                </div>

                {/* Image Type */}
                <div className="form-group">
                    <label>Image Type</label>
                    <Select
                        options={imageTypeOptions}
                        value={imageTypeOptions.find(
                            (o) => o.value === filters.imageType
                        )}
                        onChange={(selected) =>
                            setFilters((prev) => ({
                                ...prev,
                                imageType: selected?.value || "",
                            }))
                        }
                        placeholder="Select type"
                        isClearable
                    />
                </div>

                <button className="search-btn" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* RIGHT RESULTS PANEL */}
            <div className="search__results">
                <h2>Results {" "}<span>{!results ? "0" : results.length}</span></h2>
                {/* <p>Projects will appear here...</p> */}

                {
                    isLoading ? "Loading..." :
                        !results ? "Start to Search Projects" : results.length < 1 ? "No data can be found" : results.map(({ imageUrl, pdfUrl }) => (<>
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ width: "350px", height: "300px", marginTop: "1rem" }}>
                                    <img src={imageUrl} alt="Project preview" style={{ width: "100%", height: "100%" }} />
                                </div>
                            </a>
                        </>))
                }
            </div>
        </section>
    );
};

export default SearchSection;