document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for study resources
    const tabBtns = document.querySelectorAll('.tab-btn');
    const moduleContents = document.querySelectorAll('.module-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all module contents
            moduleContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected module content
            const moduleId = btn.getAttribute('data-module');
            document.getElementById(moduleId).style.display = 'grid';
        });
    });
    
    // Set first tab as active by default
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }
    
    // Tool tabs functionality
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolContents = document.querySelectorAll('.tool-content');
    
    toolTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            toolTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tool contents
            toolContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tool content
            const toolId = tab.getAttribute('data-tool');
            document.getElementById(toolId).classList.add('active');
        });
    });
    
    // Set first tool tab as active by default
    if (toolTabs.length > 0) {
        toolTabs[0].click();
    }
    
    // Pediatric Dosage Calculator
    const calculateBtn = document.getElementById('calculate-dose');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const weight = parseFloat(document.getElementById('weight').value);
            const dosePerKg = parseFloat(document.getElementById('dose-per-kg').value);
            
            if (isNaN(weight) || isNaN(dosePerKg)) {
                alert('Please enter valid numbers for weight and dose');
                return;
            }
            
            const totalDose = weight * dosePerKg;
            document.getElementById('total-dose').textContent = totalDose.toFixed(2);
            
            // Add animation to result
            const result = document.querySelector('.calculator-result');
            result.style.animation = 'none';
            setTimeout(() => {
                result.style.animation = 'pulse 0.5s';
            }, 10);
        });
    }
    
    // Quiz functionality
    const quizData = [
        {
            question: "Which of the following is a beta-blocker?",
            options: ["Lisinopril", "Metoprolol", "Amlodipine", "Hydrochlorothiazide"],
            answer: "Metoprolol",
            explanation: "Metoprolol is a selective β1 receptor blocker used to treat high blood pressure and heart failure. It works by blocking the effects of adrenaline on β1 receptors in the heart."
        },
        {
            question: "What is the mechanism of action of ACE inhibitors?",
            options: [
                "Block calcium channels",
                "Inhibit angiotensin-converting enzyme",
                "Block beta receptors",
                "Inhibit HMG-CoA reductase"
            ],
            answer: "Inhibit angiotensin-converting enzyme",
            explanation: "ACE inhibitors block the angiotensin-converting enzyme, preventing the conversion of angiotensin I to angiotensin II, leading to vasodilation and reduced blood pressure."
        }
        // Add more questions here
    ];
    
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        const questionText = document.getElementById('question-text');
        const quizOptions = document.querySelector('.quiz-options');
        const submitBtn = document.getElementById('btn-submit');
        const nextBtn = document.getElementById('btn-next');
        const feedbackSection = document.querySelector('.quiz-feedback');
        const explanationText = document.getElementById('explanation-text');
        const currentQuestionDisplay = document.getElementById('current-question');
        const totalQuestionsDisplay = document.getElementById('total-questions');
        const currentScoreDisplay = document.getElementById('current-score');
        const totalScoreDisplay = document.getElementById('total-score');
        
        let currentQuestion = 0;
        let score = 0;
        
        totalQuestionsDisplay.textContent = quizData.length;
        totalScoreDisplay.textContent = quizData.length;
        
        function loadQuestion() {
            const question = quizData[currentQuestion];
            questionText.textContent = question.question;
            
            quizOptions.innerHTML = '';
            question.options.forEach((option, index) => {
                const optionCard = document.createElement('label');
                optionCard.className = 'option-card';
                if (option === question.answer) {
                    optionCard.classList.add('correct-answer');
                }
                optionCard.innerHTML = `
                    <input type="radio" name="quiz-option" value="${option}">
                    <div class="option-content">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </div>
                `;
                quizOptions.appendChild(optionCard);
            });
            
            currentQuestionDisplay.textContent = currentQuestion + 1;
            feedbackSection.classList.add('hidden');
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
        
        function checkAnswer() {
            const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
            
            if (!selectedOption) {
                alert('Please select an answer');
                return;
            }
            
            const userAnswer = selectedOption.value;
            const correctAnswer = quizData[currentQuestion].answer;
            
            if (userAnswer === correctAnswer) {
                score++;
                currentScoreDisplay.textContent = score;
                feedbackSection.querySelector('.feedback-result').className = 'feedback-result correct';
                feedbackSection.querySelector('.feedback-result').innerHTML = '<i class="fas fa-check-circle"></i> Correct!';
            } else {
                feedbackSection.querySelector('.feedback-result').className = 'feedback-result incorrect';
                feedbackSection.querySelector('.feedback-result').innerHTML = '<i class="fas fa-times-circle"></i> Incorrect';
            }
            
            explanationText.textContent = quizData[currentQuestion].explanation;
            feedbackSection.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            
            // Update progress bar
            const progressFill = document.querySelector('.quiz-progress .progress-fill');
            const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
        
        submitBtn.addEventListener('click', checkAnswer);
        
        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                quizContainer.innerHTML = `
                    <div class="quiz-complete">
                        <div class="complete-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h3>Quiz Completed!</h3>
                        <p>Your final score: ${score}/${quizData.length}</p>
                        <button class="btn btn-primary" onclick="location.reload()">
                            <i class="fas fa-redo"></i> Try Again
                        </button>
                    </div>
                `;
            }
        });
        
        loadQuestion();
    }
    
    // Flashcards functionality
    const flashcardsData = [
        {
            front: "What is the mechanism of action of ACE inhibitors?",
            back: "ACE inhibitors block the angiotensin-converting enzyme, preventing the conversion of angiotensin I to angiotensin II, leading to vasodilation and reduced blood pressure.",
            mnemonic: "'ACE blocks the race' - stops the angiotensin conversion race"
        },
        {
            front: "What is the first-line treatment for hypertension in diabetics?",
            back: "ACE inhibitors or ARBs are first-line for hypertension in diabetics due to their renal protective effects.",
            mnemonic: "Think 'A' for ACE/ARB and 'A' for Albuminuria protection"
        }
        // Add more flashcards here
    ];
    
    const flashcard = document.querySelector('.flashcard');
    const flashcardInner = document.querySelector('.flashcard-inner');
    const flashcardFront = document.querySelector('.flashcard-front');
    const flashcardBack = document.querySelector('.flashcard-back');
    const nextCardBtn = document.querySelector('.btn-next-card');
    const hardBtn = document.querySelector('.btn-danger');
    const learnedBtn = document.querySelector('.btn-success');
    
    let currentCard = 0;
    let hardCards = [];
    let masteredCards = [];
    
    function loadFlashcard() {
        const card = flashcardsData[currentCard];
        flashcardFront.querySelector('h3').textContent = card.front;
        flashcardBack.querySelector('.flashcard-answer p').textContent = card.back;
        flashcardBack.querySelector('.flashcard-mnemonics p').textContent = card.mnemonic;
        
        // Update progress
        const progressText = document.querySelector('.progress-text span:last-child');
        progressText.textContent = `${currentCard + 1}/${flashcardsData.length}`;
        
        const progressFill = document.querySelector('.flashcard-progress .progress-fill');
        const progressPercent = ((currentCard + 1) / flashcardsData.length) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }
    
    if (flashcard) {
        loadFlashcard();
        
        // Flip card on click
        flashcard.addEventListener('click', function() {
            flashcardInner.style.transform = flashcardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
        
        nextCardBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentCard = (currentCard + 1) % flashcardsData.length;
            flashcardInner.style.transform = 'rotateY(0deg)';
            setTimeout(loadFlashcard, 500);
        });
        
        hardBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!hardCards.includes(currentCard)) {
                hardCards.push(currentCard);
            }
            this.innerHTML = '<i class="fas fa-check"></i> Marked Hard';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-times"></i> Hard';
            }, 2000);
        });
        
        learnedBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!masteredCards.includes(currentCard)) {
                masteredCards.push(currentCard);
            }
            this.innerHTML = '<i class="fas fa-check"></i> Marked Learned';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Easy';
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add pulse animation for important actions
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});