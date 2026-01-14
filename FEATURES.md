# Listen to Learn - Feature Documentation

Complete guide to all features and how to use them.

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Dashboard](#dashboard)
3. [Lecture Input](#lecture-input)
4. [Lecture Workspace](#lecture-workspace)
5. [Study Tools](#study-tools)
6. [Organization](#organization)
7. [Data Management](#data-management)

---

## Authentication

### Sign In Options

#### Google Sign-In
- **Fastest way to get started**
- Automatically imports your Google profile
- No password to remember

**Steps:**
1. Click "Sign in with Google"
2. Select your Google account
3. Complete onboarding
4. Done! You're ready to start recording

#### Email/Password
- **For those who prefer traditional auth**
- Simple email and password

**Create Account:**
1. Click "Sign Up"
2. Enter full name
3. Enter email
4. Create a password (min 6 characters)
5. Click "Create Account"

**Sign In:**
1. Click "Sign In"
2. Enter your email
3. Enter your password
4. Click "Sign In"

### Onboarding

After your first login, you'll see the onboarding screen:

1. **School Level**
   - High School
   - College / University
   - Graduate School
   - Professional Training

2. **Subjects**
   - Enter your classes (comma-separated)
   - Example: "Biology, History, Calculus"
   - You can add more later

3. **Organization Method**
   - By Class / Subject (recommended)
   - By Date
   - By Topic

---

## Dashboard

Your personal learning control center.

### Quick Stats

Shows at a glance:
- **Lectures** - Total number of recorded/uploaded lectures
- **Notes** - Estimated number of notes (3 per lecture)
- **Hours Saved** - Time saved by organizing lectures

### Recent Lectures

Shows your 6 most recent lectures:
- Lecture title
- Subject
- Date recorded
- Duration
- Quick actions (View, Delete)

**Click "View"** to open the lecture workspace
**Click "Delete"** to remove a lecture permanently

### Your Subjects

Cards for each subject you created:
- Subject icon (auto-assigned)
- Subject name
- Number of lectures

**Click "View"** to see all lectures in that subject (coming soon)
**Click "Remove"** to delete the subject

### New Lecture Button

Large "+ New Lecture" button at the top:
- Click to open the lecture input dialog
- Choose between recording or uploading
- Quick access to your most important action

---

## Lecture Input

### Recording a Lecture

Perfect for live lectures or studying out loud.

**Steps:**
1. Click "+ New Lecture"
2. Click "Record" tab
3. Enter lecture title
   - Example: "Chapter 3: Cell Structure"
4. Select subject from dropdown
5. Click "Start Recording" (red button)
6. Start talking! Your audio is being recorded
7. Click "Stop" when done
8. Click "Create Lecture"

**Tips:**
- Speak clearly and at normal volume
- Works best with a headset/microphone
- Recording is stored locally before upload
- Check browser permissions if it doesn't work

**What happens:**
- Audio is saved to your browser
- Uploaded to Firebase Cloud Storage
- Metadata (title, subject, duration) saved to database
- You can now access it anytime

### Uploading a Lecture

Perfect for:
- Zoom recordings
- Teams calls
- Downloaded lectures
- Recordings from your phone

**Steps:**
1. Click "+ New Lecture"
2. Click "Upload" tab
3. Enter lecture title
4. Select subject from dropdown
5. Click the upload area or "Browse"
6. Select your audio file (MP3, WAV, M4A, OGG)
7. Wait for file preview
8. Click "Create Lecture"

**Supported Formats:**
- MP3 (most common)
- WAV (uncompressed)
- M4A (iTunes/Apple)
- OGG (open format)
- FLAC (lossless)

**File Size Limits:**
- Max 100MB per file
- Consider compressing very large files
- Recommended: MP3 at 128kbps

---

## Lecture Workspace

The heart of Listen to Learn. Where you organize, learn, and study.

### Layout

Three-column layout:
1. **Left Sidebar** - Key ideas & vocabulary
2. **Main Content** - Notes, timeline, study tools
3. **Right Sidebar** - Deep dives & audio player

### Audio Player

**Top Right Section:**
- Play/pause controls
- Timeline scrubber
- Volume control
- Duration indicator

**Metadata:**
- Recording date
- Total duration

**Use:** Listen to the lecture while taking notes

### Notes Section

**Main center panel**

#### View Mode (Default)
- Reads and displays your notes
- Formatted with titles, subtopics, bullets
- Clickable for highlighting
- Scrollable if long

#### Edit Mode
- **Click "Edit"** button to switch
- Textarea for writing/editing
- Supports markdown formatting
- Auto-saves when you click "View"

**Markdown Syntax:**
```markdown
# Title (use # at start)
## Subtitle (use ## at start)
### Sub-item (use ### at start)

* Bullet point
* Another bullet

**Bold text** with **...**
*Italic text* with *...*
```

**Tips:**
- Write as you listen or after the lecture
- Be organized - use headers and bullets
- You can copy notes from lecture slides
- Use timestamps to mark important parts

### Timeline & Segments

**Below audio player**

Helps you navigate through the lecture:
- Automatically splits lectures into segments
- Click a segment to jump to that time
- Segment labels show the topic

**Usage:**
- Click a timeline segment to jump to that part
- Notes can be linked to timeline segments
- Perfect for finding specific topics later

### Key Ideas Panel

**Left sidebar, top**

Extract the most important concepts:

**Adding Ideas:**
1. Type your idea in the text input
2. Click "+" to add
3. Idea appears in the list

**Editing:**
- Click an idea to select it (future feature)
- Click "×" to delete an idea

**Converting to Flashcards:**
- Click "Flashcards" study tool
- Your key ideas become flashcard questions

**Tips:**
- Focus on exam-relevant concepts
- Keep ideas short but specific
- Review frequently for better retention

### Vocabulary List

**Left sidebar, below Key Ideas**

Build a personal glossary:

**Adding Terms:**
1. Type the term name
2. Click "+" to add
3. You can add definitions later

**Vocabulary Entry:**
- Term: The word or concept
- Definition: What it means (added later)

**Using Vocabulary:**
- Great for language/science classes
- Create a glossary for each subject
- Helps you learn key terminology

**Tips:**
- Add terms as you encounter them
- Define terms in your own words
- Group by topic for faster learning

### Deep Dives

**Right sidebar, bottom**

For topics that need deeper understanding:

**Adding a Deep Dive:**
1. Click "+ Add Deep Dive"
2. Enter the topic name
3. Type your explanation
4. Examples (added later)

**Deep Dive Content:**
- **Topic:** What you're diving into
- **Explanation:** Simplified breakdown
- **Examples:** Real-world applications
- **Why It Matters:** Connection to bigger picture

**Usage:**
- Expand complex topics
- Add examples and analogies
- Explain the "why" not just the "what"
- Perfect for topics you struggle with

**Tips:**
- Write explanations for future you
- Include analogies and examples
- Link to real-world applications
- Review when studying for exams

---

## Study Tools

### Highlighting

Mark important text while studying:

**Using Highlighting:**
1. Click "Highlighting" button
2. Select text in your notes
3. Choose color:
   - Yellow (important)
   - Green (key concept)
   - Blue (remember this)

**Tips:**
- Don't highlight too much (< 20% of notes)
- Use consistently (same color for same type)
- Highlight while reading carefully
- Review highlights later

### Flashcards

Convert your learning into quiz mode:

**Creating Flashcards:**
1. Add key ideas to your lecture first
2. Click "Flashcards" button
3. Your key ideas appear as question cards

**Using Flashcards:**
1. Read the question
2. Think of the answer
3. Click card to reveal answer
4. Click "Next" for the next card

**Flashcard Cycle:**
- Question side (blue) - Try to answer
- Answer side (green) - Check your answer
- Next card - Move forward

**Study Tips:**
- Review new material 1 hour after learning
- Space repetitions over days and weeks
- Focus on cards you get wrong
- Shuffle order to avoid memorizing sequence

**When to Use:**
- Before exams
- Testing yourself
- Learning vocabulary
- Memorizing facts

### Quick Review

Fast review mode for last-minute studying:

**Using Quick Review:**
1. Click "Quick Review" button
2. Shows only bullet points
3. Auto-dismisses after 15 seconds
4. Back to normal notes

**What It Shows:**
- Key ideas only
- Bullet-point format
- No deep explanations
- Clean, scannable layout

**When to Use:**
- Right before an exam
- Quick refreshers
- Checking you remember main points
- Pre-class warm-up

**Tips:**
- Combine with listening to audio at 1.5x speed
- Test yourself without looking
- Use multiple Quick Reviews during the day

---

## Organization

### Subjects

Group lectures by class/course:

**Creating a Subject:**
1. Click "+ Add Subject" on dashboard
2. Enter subject name
3. Optional: Add description
4. Click "Create Subject"

**Subject Features:**
- Custom icon (auto-assigned)
- Lecture count
- Quick view button
- Delete option

**Best Practices:**
- Use official course names
- One subject per class
- Use consistent naming (e.g., "Biology 101" not "Bio")

### Organizing Lectures

**Assigning to Subject:**
1. When creating a lecture
2. Select subject from dropdown
3. Lecture automatically organized

**Viewing by Subject:**
1. Click subject card on dashboard
2. See all lectures in that subject
3. Filter and search by subject

### Search (Coming Soon)

Search across all your notes:
- By title
- By subject
- By content
- By date range

---

## Data Management

### Downloading Notes

Export your lecture notes:

**Steps:**
1. Open a lecture
2. Click "Export" button
3. Notes download as Markdown file
4. Open in any text editor

**File Format:**
- Markdown (.md)
- Plain text format
- Compatible with all editors
- Can be converted to PDF/Word

**Uses:**
- Backup important notes
- Share with classmates
- Print for physical copies
- Import into other apps

### Deleting Data

Permanently remove lectures or subjects:

**Delete Lecture:**
1. Click "Delete" on lecture card
2. Confirm deletion
3. Cannot be undone

**Delete Subject:**
1. Click "Remove" on subject card
2. Confirm deletion
3. Lectures stay (not deleted with subject)

**Warning:** Deletions are permanent!

### Privacy & Security

Your data is private:
- Only you can access your lectures
- Firestore security rules enforce this
- Audio stored in private Cloud Storage
- Data is encrypted in transit

---

## Tips & Tricks

### Time Management
- Record lectures during class
- Review and add deep dives within 24 hours
- Create flashcards weekly
- Study 30 minutes before exams

### Better Notes
- Use consistent formatting
- Leave space for additions
- Focus on concepts, not transcription
- Review your own notes, not transcripts

### Effective Learning
- Use multiple study modes (notes, flashcards, review)
- Space out your studying (spaced repetition)
- Test yourself before exams
- Combine with active recall

### Organization Tips
- Create subjects before recording
- Use descriptive lecture titles
- Add key ideas immediately after
- Update deep dives within 48 hours

---

## Common Questions

**Q: Can I share lectures with classmates?**
A: Not yet - coming in a future update. For now, export notes and send via email.

**Q: How much storage do I get?**
A: Free tier includes 5GB. Most users never hit this limit.

**Q: Can I edit audio after recording?**
A: Not in the app, but you can edit with free tools like Audacity.

**Q: What if I run out of storage?**
A: Delete old lectures or upgrade to premium (contact support).

**Q: Can I use on my phone?**
A: Web version works on mobile. Native apps coming soon.

**Q: How long do my notes stay?**
A: Permanently unless you delete them. We don't delete inactive accounts.

---

For more help, check the main README.md or SETUP.md guide.
