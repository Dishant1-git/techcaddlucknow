// Photos from techcadd's labs, workshops and college events (public/images/gallery).
// `w` and `h` are the stored sizes, so the grid can reserve space before they load.

export const galleryTags = ["All", "Labs", "Workshops", "Robotics", "Recognition"] as const;
export type GalleryTag = Exclude<(typeof galleryTags)[number], "All">;

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  tag: GalleryTag;
  w: number;
  h: number;
};

const sq = { w: 1600, h: 1600 };
const photo = (name: string, tag: GalleryTag, caption: string, alt: string, size = sq): Photo => ({
  src: `/images/gallery/${name}.webp`,
  tag,
  caption,
  alt,
  ...size,
});

export const gallery: Photo[] = [
  photo("lab-welcome-batch", "Labs", "A full batch in the main lab", "Students working on laptops along a long bench in front of a blue 'Welcome to the next level' wall", { w: 806, h: 1600 }),
  photo("robot-dog-student", "Robotics", "Meeting the robot dog", "A student crouches to greet a techcadd-branded robot dog outdoors"),
  photo("lab-coding-class", "Labs", "Coding lab in session", "Students coding at desktop computers in a bright lab"),
  photo("founder-auditorium", "Workshops", "Career talk to a full auditorium", "The founder addresses a packed auditorium of students in red seats", { w: 1536, h: 1024 }),
  photo("aero-lab-mentors", "Labs", "Mentors at every desk", "Two mentors help students in the aircraft-cabin styled computer lab"),
  photo("robotics-soldering", "Robotics", "Building a robot kit", "A student solders a small robotics kit while a classmate hands her parts"),
  photo("cgc-partnership", "Recognition", "Partnership with CGC Landran", "techcadd and Chandigarh Engineering College staff hold a partnership banner, with the robot dog in front"),
  photo("lab-passion-wall", "Labs", "Passion. Innovation. Expertise.", "A row of students on laptops beneath the words passion, innovation, expertise", { w: 810, h: 1600 }),
  photo("langchain-seminar", "Workshops", "LangChain seminar", "A techcadd trainer presents 'Why use LangChain?' from a laptop to a large hall", { w: 1536, h: 1024 }),
  photo("ai-course-presentation", "Workshops", "Introducing the AI course", "A trainer points to the Artificial Intelligence certificate course on a wall screen", { w: 1448, h: 1086 }),
  photo("robot-dog-closeup", "Robotics", "Our robot dog", "Close-up of a grey quadruped robot with the techcadd logo", { w: 1536, h: 1024 }),
  photo("team-stage-group", "Recognition", "Team techcadd", "The techcadd team seated and standing on a stage beneath a large techcadd logo"),
  photo("data-session", "Labs", "Small-group data session", "A trainer walks students through a data table on a wall screen in a meeting room", { w: 794, h: 1600 }),
  photo("auditorium-workshop", "Workshops", "Seminar day", "Hundreds of students seated in a modern auditorium with wooden ceiling slats", { w: 1436, h: 1096 }),
  photo("mou-ai-unleashed", "Recognition", "MoU at ‘AI Unleashed’", "The founder and college officials hold signed agreements beside the robot dog at the AI Unleashed robotics show"),
  photo("lab-hands-on", "Labs", "Hands-on practice", "Students practise at computers in the lab"),
  photo("team-room", "Labs", "Project room", "Students collaborate on laptops around a table under the words 'Success is a decision'", { w: 806, h: 1600 }),
  photo("founder-robot-dog-stage", "Robotics", "Robotics demo on stage", "The founder presents on stage while the robot dog stands on its hind legs"),
  photo("universal-placement-drive", "Recognition", "Mega placement drive", "The techcadd team at a placement drive banner with Universal Group of Institutions staff", { w: 1600, h: 900 }),
  photo("design-lab-mentor-2", "Labs", "Design lab mentoring", "A mentor reviews a student's design work in the lab", { w: 1446, h: 1087 }),
  photo("lecture-room", "Workshops", "Theory before practice", "Students in a lecture room watching a trainer present on a screen"),
  photo("award-ceremony", "Recognition", "Honoured at a college centenary", "The founder and a team member receive mementos on stage, with the robot dog in front"),
  photo("students-coding", "Labs", "Heads down, building", "Two students coding on laptops beside a glass partition", { w: 804, h: 1600 }),
  photo("aero-lab-coding", "Labs", "Aircraft-cabin lab", "Students code on laptops in the aircraft-cabin styled lab", { w: 1254, h: 1254 }),
  photo("robot-dog-outdoors", "Robotics", "Out on campus", "The robot dog walks across a painted mural on campus", { w: 1024, h: 1536 }),
  photo("guest-of-honour", "Recognition", "Guest of honour", "The founder receives a guest of honour plaque on stage"),
  photo("laptop-workshop", "Labs", "Laptop workshop", "Students work on laptops around a shared table with a trainer"),
  photo("college-lab-session", "Workshops", "Campus lab session", "Rows of college students working on laptops during a techcadd session", { w: 1086, h: 1448 }),
  photo("engineers-day-award", "Recognition", "Engineer’s Day", "The founder receives a token of gratitude on Engineer's Day"),
  photo("lab-classroom", "Labs", "Lab classroom", "Students at computers in a long, bright lab"),
  photo("team-faculty-award", "Recognition", "With college faculty", "techcadd team members and college faculty stand with a memento and the robot dog"),
  photo("robot-dog-staff", "Robotics", "Robotics team", "A techcadd team member smiles beside the robot dog standing upright", { w: 811, h: 1600 }),
  photo("universal-award", "Recognition", "Recognised by Universal Group", "The founder receives a plaque from Universal Group of Institutions", { w: 1086, h: 1448 }),
  photo("lab-wide", "Labs", "The main lab", "A wide view of a lab full of students at desktop computers"),
  photo("design-lab-mentor", "Labs", "Video and design lab", "A mentor guides students editing video at desktop computers", { w: 768, h: 1024 }),
  photo("trainer-lab", "Workshops", "Lab walkthrough", "A trainer addresses students in a computer lab"),
  photo("universal-certificate", "Recognition", "Certificates day", "A student holds her certificate with the founder and college staff", { w: 1448, h: 1086 }),
  photo("lab-students-desks", "Labs", "Practice hours", "Students at desks in a lab with posters on the wall"),
  photo("lab-welcome-wall", "Labs", "Welcome to the next level", "Students on laptops in front of the blue 'Welcome to the next level' wall", { w: 807, h: 1600 }),
  photo("lab-practice", "Labs", "Practice in pairs", "Students practise in pairs at lab computers"),
];

/** Looks a photo up by its file name, so pages can reuse gallery shots. */
export const galleryPhoto = (name: string) => {
  const p = gallery.find((g) => g.src.endsWith(`/${name}.webp`));
  if (!p) throw new Error(`No gallery photo named ${name}`);
  return p;
};
