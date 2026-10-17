// Enquiry (lead) rules shared by the forms in the browser and /api/enquiry on
// the server, so both sides accept exactly the same values.
import { after12thCatalogue, courseCatalogue, coursesMenu } from "./site";

/** Every course a visitor can pick in an enquiry form. */
export const enquiryCourses = Array.from(
  new Set(
    [...coursesMenu, ...courseCatalogue, ...after12thCatalogue].flatMap((col) => col.courses.map((c) => c.label)),
  ),
);

/**
 * Which form a lead came from. Stored in the `source` column of the single
 * `enquiries` table, so add a new id here when a new form is added.
 */
export const enquirySources = {
  "book-demo": "Book Demo popup",
  "home-cta": "Home page call to action",
  "course-page": "Course page form",
} as const;

export type EnquirySource = keyof typeof enquirySources;

export const isEnquirySource = (v: string): v is EnquirySource => Object.hasOwn(enquirySources, v);

export const NAME_MAX = 80;
export const PAGE_MAX = 255;

/** Indian mobile number: 10 digits starting 6-9. */
export const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(v);

/** Letters (any script), spaces, dots, apostrophes and hyphens; 2-80 characters. */
export const isValidName = (v: string) => v.length >= 2 && v.length <= NAME_MAX && /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(v);

/** A same-site path such as "/courses/mern-full-stack". */
export const isValidPage = (v: string) => v.length <= PAGE_MAX && /^\/[A-Za-z0-9\-._~/%]*$/.test(v);
