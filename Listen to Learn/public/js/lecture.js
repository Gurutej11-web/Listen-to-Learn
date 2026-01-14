// Lecture Workspace functionality

let currentLectureData = null;
let isEditMode = false;
let isHighlightMode = false;

async function initLectureWorkspace() {
  if (!window.currentLectureId) {
    navigateTo('dashboard');
    return;
  }
  
  try {
    const doc = await db.collection('lectures').doc(window.currentLectureId).get();
    if (!doc.exists) {
      showError('Lecture not found');
      navigateTo('dashboard');
      return;
    }
    
    currentLectureData = { id: doc.id, ...doc.data() };
    
    // Update UI
    document.getElementById('lectureTitle').textContent = currentLectureData.title;
    
    // Load audio
    if (currentLectureData.audioUrl) {
      document.getElementById('lectureAudio').src = currentLectureData.audioUrl;
      const metadata = `Duration: ${formatDuration(currentLectureData.duration || 0)} | Recorded: ${formatDate(currentLectureData.createdAt)}`;
      document.getElementById('lectureMetadata').textContent = metadata;
    }
    
    // Load notes
    loadNotes();
    
    // Load key ideas
    loadKeyIdeas();
    
    // Load vocabulary
    loadVocabulary();
    
    // Load deep dives
    loadDeepDives();
    
  } catch (error) {
    console.error('Error initializing lecture:', error);
    showError('Failed to load lecture');
  }
}

// Notes Management
function loadNotes() {
  if (!currentLectureData || !currentLectureData.notes) {
    document.getElementById('notesContent').innerHTML = '<div class="empty-state"><p>Start adding your notes</p></div>';
    return;
  }
  
  const notesHtml = markdownToHtml(currentLectureData.notes);
  document.getElementById('notesContent').innerHTML = notesHtml;
}

function toggleEditMode() {
  isEditMode = !isEditMode;
  const display = document.getElementById('notesContent');
  const editor = document.getElementById('notesEditor');
  const editBtn = document.getElementById('editModeBtn');
  const viewBtn = document.getElementById('viewModeBtn');
  
  if (isEditMode) {
    display.style.display = 'none';
    editor.style.display = 'block';
    editor.value = currentLectureData.notes || '';
    editBtn.style.display = 'none';
    viewBtn.style.display = 'inline-block';
  } else {
    editor.style.display = 'none';
    display.style.display = 'block';
    currentLectureData.notes = editor.value;
    saveNotes();
    loadNotes();
    editBtn.style.display = 'inline-block';
    viewBtn.style.display = 'none';
  }
}

async function saveNotes() {
  try {
    await db.collection('lectures').doc(currentLectureData.id).update({
      notes: currentLectureData.notes
    });
    showSuccess('Notes saved');
  } catch (error) {
    console.error('Error saving notes:', error);
    showError('Failed to save notes');
  }
}

// Key Ideas Management
function loadKeyIdeas() {
  const ideas = currentLectureData.keyIdeas || [];
  const container = document.getElementById('keyIdeasList');
  
  if (ideas.length === 0) {
    container.innerHTML = '<div class="empty-state-small">Click + to add ideas</div>';
    return;
  }
  
  container.innerHTML = ideas.map((idea, idx) => `
    <div class="idea-item">
      <span>${idea}</span>
      <button class="item-delete" onclick="removeKeyIdea(${idx})">✕</button>
    </div>
  `).join('');
}

async function addKeyIdea() {
  const input = document.getElementById('newKeyIdea');
  const idea = input.value.trim();
  
  if (!idea) return;
  
  try {
    const ideas = currentLectureData.keyIdeas || [];
    ideas.push(idea);
    
    await db.collection('lectures').doc(currentLectureData.id).update({
      keyIdeas: ideas
    });
    
    currentLectureData.keyIdeas = ideas;
    input.value = '';
    loadKeyIdeas();
    showSuccess('Idea added');
  } catch (error) {
    console.error('Error adding idea:', error);
  }
}

async function removeKeyIdea(index) {
  try {
    const ideas = currentLectureData.keyIdeas || [];
    ideas.splice(index, 1);
    
    await db.collection('lectures').doc(currentLectureData.id).update({
      keyIdeas: ideas
    });
    
    currentLectureData.keyIdeas = ideas;
    loadKeyIdeas();
  } catch (error) {
    console.error('Error removing idea:', error);
  }
}

// Vocabulary Management
function loadVocabulary() {
  const vocab = currentLectureData.vocabularyList || [];
  const container = document.getElementById('vocabularyList');
  
  if (vocab.length === 0) {
    container.innerHTML = '<div class="empty-state-small">Click + to add terms</div>';
    return;
  }
  
  container.innerHTML = vocab.map((item, idx) => `
    <div class="vocab-item">
      <span><strong>${item.term}</strong>: ${item.definition || 'No definition'}</span>
      <button class="item-delete" onclick="removeVocabTerm(${idx})">✕</button>
    </div>
  `).join('');
}

async function addVocabTerm() {
  const termInput = document.getElementById('newVocabTerm');
  const term = termInput.value.trim();
  
  if (!term) return;
  
  try {
    const vocab = currentLectureData.vocabularyList || [];
    vocab.push({ term, definition: '' });
    
    await db.collection('lectures').doc(currentLectureData.id).update({
      vocabularyList: vocab
    });
    
    currentLectureData.vocabularyList = vocab;
    termInput.value = '';
    loadVocabulary();
  } catch (error) {
    console.error('Error adding vocab term:', error);
  }
}

async function removeVocabTerm(index) {
  try {
    const vocab = currentLectureData.vocabularyList || [];
    vocab.splice(index, 1);
    
    await db.collection('lectures').doc(currentLectureData.id).update({
      vocabularyList: vocab
    });
    
    currentLectureData.vocabularyList = vocab;
    loadVocabulary();
  } catch (error) {
    console.error('Error removing vocab term:', error);
  }
}

// Deep Dives Management
function loadDeepDives() {
  const deepDives = currentLectureData.deepDives || [];
  const container = document.getElementById('deepDivesList');
  
  if (deepDives.length === 0) {
    container.innerHTML = '<div class="empty-state-small">Click + to add deep dives</div>';
    return;
  }
  
  container.innerHTML = deepDives.map((dive, idx) => `
    <div class="deep-dive-item">
      <span>${dive.topic}</span>
      <button class="item-delete" onclick="removeDeepDive(${idx})">✕</button>
    </div>
  `).join('');
}

function openDeepDiveForm() {
  const topic = prompt('What topic would you like to dive deeper into?');
  if (!topic) return;
  
  const explanation = prompt('Add your explanation or notes:');
  if (!explanation) return;
  
  addDeepDive(topic, explanation);
}

async function addDeepDive(topic, content) {
  try {
    const deepDives = currentLectureData.deepDives || [];
    deepDives.push({
      topic,
      content,
      examples: []
    });
    
    await db.collection('lectures').doc(currentLectureData.id).update({
      deepDives: deepDives
    });
    
    currentLectureData.deepDives = deepDives;
    loadDeepDives();
    showSuccess('Deep dive added');
  } catch (error) {
    console.error('Error adding deep dive:', error);
  }
}

async function removeDeepDive(index) {
  try {
    const deepDives = currentLectureData.deepDives || [];
    deepDives.splice(index, 1);
    
    await db.collection('lectures').doc(currentLectureData.id).update({
      deepDives: deepDives
    });
    
    currentLectureData.deepDives = deepDives;
    loadDeepDives();
  } catch (error) {
    console.error('Error removing deep dive:', error);
  }
}

// Study Tools
function toggleHighlightMode() {
  isHighlightMode = !isHighlightMode;
  
  if (isHighlightMode) {
    document.getElementById('notesContent').classList.add('highlight-mode');
    showSuccess('Highlight mode activated. Click text to highlight.');
  } else {
    document.getElementById('notesContent').classList.remove('highlight-mode');
    showSuccess('Highlight mode deactivated');
  }
}

function showFlashcards() {
  const modal = document.getElementById('flashcardsModal');
  const ideas = currentLectureData.keyIdeas || [];
  
  if (ideas.length === 0) {
    showError('Add some key ideas first to create flashcards');
    return;
  }
  
  let html = '<div class="flashcard-display">';
  
  ideas.forEach((idea, idx) => {
    html += `
      <div class="flashcard" onclick="this.classList.toggle('show-answer')">
        <div class="flashcard-question">${idea}</div>
        <div class="flashcard-answer" style="display: none;">Add your answer or explanation</div>
      </div>
    `;
  });
  
  html += '</div>';
  document.getElementById('flashcardContent').innerHTML = html;
  modal.style.display = 'flex';
}

function closeFlashcards() {
  document.getElementById('flashcardsModal').style.display = 'none';
}

function toggleQuickReview() {
  const notes = currentLectureData.notes || '';
  const ideas = currentLectureData.keyIdeas || [];
  
  if (!notes && ideas.length === 0) {
    showError('Add notes or key ideas first');
    return;
  }
  
  let html = '<div class="quick-review"><ul>';
  ideas.forEach(idea => {
    html += `<li>• ${idea}</li>`;
  });
  html += '</ul></div>';
  
  const notesContent = document.getElementById('notesContent');
  const currentHtml = notesContent.innerHTML;
  notesContent.innerHTML = html;
  
  setTimeout(() => {
    notesContent.innerHTML = currentHtml;
  }, 15000);
}

// Download/Export
function downloadNotes() {
  const title = currentLectureData.title || 'lecture';
  const content = `# ${title}\n\n${currentLectureData.notes || ''}`;
  
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.md`;
  a.click();
  URL.revokeObjectURL(url);
  
  showSuccess('Notes downloaded');
}

// Helper: Convert simple markdown to HTML
function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  let html = markdown
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/^\* (.*?)$/gm, '<li>$1</li>')
    .replace(/(?:<li>.*<\/li>)/s, '<ul>$&</ul>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<') || match === '') return match;
      return `<p>${match}</p>`;
    });
  
  return `<div class="notes-content">${html}</div>`;
}
