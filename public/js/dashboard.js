// Dashboard functionality

async function initDashboard() {
  await loadRecentLectures();
  await loadSubjects();
  updateStats();
  populateSubjectSelects();
}

// Load recent lectures
async function loadRecentLectures() {
  if (!currentUser) return;
  
  try {
    const snapshot = await db.collection('lectures')
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .limit(6)
      .get();
    
    const container = document.getElementById('recentLectures');
    
    if (snapshot.empty) {
      container.innerHTML = '<div class="empty-state"><p>No lectures yet. <a href="#" onclick="openLectureInput()">Record your first lecture</a></p></div>';
      return;
    }
    
    container.innerHTML = '';
    snapshot.forEach(doc => {
      const lecture = doc.data();
      const card = createLectureCard(doc.id, lecture);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading lectures:', error);
    showError('Failed to load lectures');
  }
}

// Create lecture card element
function createLectureCard(lectureId, lecture) {
  const card = document.createElement('div');
  card.className = 'lecture-card';
  card.innerHTML = `
    <div class="lecture-card-header">
      <div class="lecture-card-title">${lecture.title || 'Untitled'}</div>
      <div class="lecture-card-subject">${lecture.subject || 'No subject'}</div>
    </div>
    <div class="lecture-card-body">
      <div class="lecture-meta">
        <span>${formatDate(lecture.createdAt)}</span>
        <span class="lecture-duration">${formatDuration(lecture.duration || 0)}</span>
      </div>
      <div class="lecture-card-actions">
        <button class="btn btn-primary btn-small" onclick="openLecture('${lectureId}')">View</button>
        <button class="btn btn-danger btn-small" onclick="deleteLecture('${lectureId}')">Delete</button>
      </div>
    </div>
  `;
  return card;
}

// Load subjects
async function loadSubjects() {
  if (!currentUser) return;
  
  try {
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const subjects = userDoc.data()?.subjects || [];
    
    const container = document.getElementById('subjectsGrid');
    
    if (subjects.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No subjects yet. Add one to get started.</p></div>';
      return;
    }
    
    container.innerHTML = '';
    subjects.forEach((subject, index) => {
      const card = createSubjectCard(subject, index);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading subjects:', error);
  }
}

// Create subject card
function createSubjectCard(subject, index) {
  const card = document.createElement('div');
  card.className = 'subject-card';
  const icon = ['🔬', '📚', '🎨', '💻', '⚽', '🎭'][index % 6];
  card.innerHTML = `
    <div class="subject-icon">${icon}</div>
    <div class="subject-name">${subject.name || subject}</div>
    <div class="subject-count">0 lectures</div>
    <div class="subject-card-actions">
      <button class="btn btn-secondary btn-small" onclick="filterBySubject('${subject.name || subject}')">View</button>
      <button class="btn btn-danger btn-small" onclick="removeSubject('${subject.name || subject}')">Remove</button>
    </div>
  `;
  return card;
}

// Update statistics
async function updateStats() {
  if (!currentUser) return;
  
  try {
    const lecturesSnapshot = await db.collection('lectures')
      .where('userId', '==', currentUser.uid)
      .get();
    
    const totalDuration = lecturesSnapshot.docs.reduce((sum, doc) => {
      return sum + (doc.data().duration || 0);
    }, 0);
    
    document.getElementById('lectureCount').textContent = lecturesSnapshot.size;
    document.getElementById('noteCount').textContent = lecturesSnapshot.size * 3; // Estimate
    document.getElementById('hoursSaved').textContent = Math.round(totalDuration / 60 / 60 * 0.5) || 0;
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

// Open lecture input modal
function openLectureInput() {
  document.getElementById('lectureInputModal').style.display = 'flex';
  populateSubjectSelects();
}

// Close lecture input modal
function closeLectureInput() {
  document.getElementById('lectureInputModal').style.display = 'none';
  resetLectureForm();
}

// Reset form inputs
function resetLectureForm() {
  document.getElementById('recordTitle').value = '';
  document.getElementById('uploadTitle').value = '';
  document.getElementById('recordSubject').value = '';
  document.getElementById('uploadSubject').value = '';
  document.getElementById('audioFile').value = '';
  document.getElementById('fileInfo').style.display = 'none';
}

// Switch input tabs
function switchInputTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(tab + 'Tab').classList.add('active');
}

// Populate subject selects
function populateSubjectSelects() {
  if (!currentUser) return;
  
  db.collection('users').doc(currentUser.uid).get().then(doc => {
    const subjects = doc.data()?.subjects || [];
    const recordSelect = document.getElementById('recordSubject');
    const uploadSelect = document.getElementById('uploadSubject');
    
    const currentValue1 = recordSelect.value;
    const currentValue2 = uploadSelect.value;
    
    recordSelect.innerHTML = '<option value="">Select a subject</option>';
    uploadSelect.innerHTML = '<option value="">Select a subject</option>';
    
    subjects.forEach(subject => {
      const name = subject.name || subject;
      recordSelect.innerHTML += `<option value="${name}">${name}</option>`;
      uploadSelect.innerHTML += `<option value="${name}">${name}</option>`;
    });
    
    recordSelect.value = currentValue1;
    uploadSelect.value = currentValue2;
  });
}

// Handle file selection
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileInfo').style.display = 'block';
  }
}

// Submit lecture (both record and upload)
async function submitLecture() {
  const activeTab = document.querySelector('.tab-content.active');
  const isRecord = activeTab.id === 'recordTab';
  
  const title = isRecord ? 
    document.getElementById('recordTitle').value : 
    document.getElementById('uploadTitle').value;
  
  const subject = isRecord ? 
    document.getElementById('recordSubject').value : 
    document.getElementById('uploadSubject').value;
  
  if (!title || !subject) {
    showError('Please fill in all fields');
    return;
  }
  
  try {
    if (isRecord) {
      // Handle recorded audio
      if (!window.recordedBlob) {
        showError('Please record some audio first');
        return;
      }
      await uploadLecture(title, subject, window.recordedBlob, window.recordingDuration);
    } else {
      // Handle uploaded file
      const fileInput = document.getElementById('audioFile');
      if (!fileInput.files[0]) {
        showError('Please select an audio file');
        return;
      }
      await uploadLecture(title, subject, fileInput.files[0], 0);
    }
    
    closeLectureInput();
    showSuccess('Lecture created successfully!');
    await initDashboard();
  } catch (error) {
    console.error('Error creating lecture:', error);
    showError('Failed to create lecture');
  }
}

// Upload lecture to Firebase
async function uploadLecture(title, subject, audioBlob, duration) {
  if (!currentUser) return;
  
  const storageRef = storage.ref(`lectures/${currentUser.uid}/${Date.now()}`);
  await storageRef.put(audioBlob);
  const audioUrl = await storageRef.getDownloadURL();
  
  await db.collection('lectures').add({
    userId: currentUser.uid,
    title,
    subject,
    audioUrl,
    duration,
    createdAt: new Date(),
    notes: '',
    highlights: [],
    flashcards: [],
    deepDives: [],
    vocabularyList: [],
    keyIdeas: []
  });
}

// Open subject form
function openSubjectForm() {
  document.getElementById('subjectModal').style.display = 'flex';
  document.getElementById('subjectName').value = '';
  document.getElementById('subjectDesc').value = '';
}

// Close subject form
function closeSubjectForm() {
  document.getElementById('subjectModal').style.display = 'none';
}

// Create subject
async function createSubject() {
  if (!currentUser) return;
  
  const name = document.getElementById('subjectName').value;
  const desc = document.getElementById('subjectDesc').value;
  
  if (!name) {
    showError('Please enter a subject name');
    return;
  }
  
  try {
    const userRef = db.collection('users').doc(currentUser.uid);
    const userDoc = await userRef.get();
    const subjects = userDoc.data()?.subjects || [];
    
    subjects.push({ name, description: desc });
    
    await userRef.update({ subjects });
    
    closeSubjectForm();
    showSuccess('Subject created!');
    await loadSubjects();
    populateSubjectSelects();
  } catch (error) {
    console.error('Error creating subject:', error);
    showError('Failed to create subject');
  }
}

// Remove subject
async function removeSubject(subjectName) {
  if (!currentUser) return;
  
  try {
    const userRef = db.collection('users').doc(currentUser.uid);
    const userDoc = await userRef.get();
    const subjects = userDoc.data()?.subjects || [];
    
    const updated = subjects.filter(s => (s.name || s) !== subjectName);
    
    await userRef.update({ subjects: updated });
    
    showSuccess('Subject removed');
    await loadSubjects();
    populateSubjectSelects();
  } catch (error) {
    console.error('Error removing subject:', error);
  }
}

// Delete lecture
async function deleteLecture(lectureId) {
  if (!confirm('Are you sure you want to delete this lecture?')) return;
  
  try {
    await db.collection('lectures').doc(lectureId).delete();
    showSuccess('Lecture deleted');
    await initDashboard();
  } catch (error) {
    console.error('Error deleting lecture:', error);
    showError('Failed to delete lecture');
  }
}

// Open lecture
async function openLecture(lectureId) {
  window.currentLectureId = lectureId;
  navigateTo('lecture');
}

// Filter by subject
function filterBySubject(subject) {
  showError('Filtering coming soon');
}

// Helper to scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
