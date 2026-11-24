 
        const quizData = [
            {
                question: "What's the largest ocean on Earth?",
                options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
                hint: "It's so big, even Aquaman needs GPS to find his way around! It's also the one that separates you from your online shopping addiction in Asia."
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Leonardo da Vinci", "Pablo Picasso", "Van Gogh", "Michelangelo"],
                hint: "This guy was basically the Tony Stark of the Renaissance - inventor, artist, and probably would've had a killer Instagram account."
            },
            {
                question: "What is the capital of France?",
                options: ["Bordeaux", "Paris", "Lyon", "Marseille"],
                hint: "It's the city of love, croissants, and people who dramatically say 'Oh là là!' Also it's where the Eiffel Tower stands tall like a giant metal pick-up line."
            },
            {
                question: "How many continents are there?",
                options: ["Five", "Six", "Seven", "Eight"],
                hint: " It's the same number as deadly sins, but way less dramatic and more geographical."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Jupiter", "Saturn", "Mars", "Venus"],
                hint: "It's redder than a tomato and has been getting all the attention from billionaires who want to move there! Named after a Roman god who definitely had anger management issues."
            },
            {
                question: "What's the hardest natural substance on Earth?",
                options: ["Gold", "Diamond", "Platinum", "Steel"],
                hint: "It's what they say is a girl's best friend, but also what makes drill bits very happy! Costs more than your monthly rent and sparkles like your personality should."
            },
            {
                question: "What's the smallest unit of life?",
                options: ["Atom", "Molecule", "Organ", "Cell"],
                hint: "It's smaller than your patience when waiting for Wi-Fi to connect!"
            },
            {
                question: "Who wrote Romeo and Juliet?",
                options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "George Orwell"],
                hint: "YOU SERIOUSLY CLICKED THE HINT, WOW! You sure you passed matric."
            },
            {
                question: "Who was the first person to walk on the moon?",
                options: ["Alan Bean", "Buzz Aldrin", "Neil Armstrong", "John Glenn"],
                hint: "One small step for man, one giant leap for his career! His last name sounds like  you need to do 100 push-ups - but in space, nobody can hear you grunt."
            },
            {
                question: "How many colors are in a rainbow?",
                options: ["Five", "Six", "Seven", "Eight"],
                hint: "It's the same number of dwarfs that helped Snow White !"
            }
        ];

        // The correct answers (0-indexed)
        const correctAnswers = [0, 0, 1, 2, 2, 1, 3, 0, 2, 2];
        
        // List of DOM elements used 
        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        const resultsScreen = document.getElementById('results-screen');
        const playerNameInput = document.getElementById('player-name');
        const nameError = document.getElementById('name-error');
        const startBtn = document.getElementById('start-btn');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');
        const currentScoreSpan = document.getElementById('current-score');
        const finalScoreSpan = document.getElementById('final-score');
        const maxScoreSpan = document.getElementById('max-score');
        const quizProgress = document.getElementById('quiz-progress');
        const resultsMessage = document.getElementById('results-message');
        const timerDisplay = document.getElementById('timer-display');
        const skipBtn = document.getElementById('skip-btn');
        const restartBtn = document.getElementById('restart-btn');
        const homeBtn = document.getElementById('home-btn');
        const hintBtn = document.getElementById('hint-btn');
        const hintText = document.getElementById('hint-text');
        
        // Game state
        let currentQuestion = 0;
        let score = 0;
        let timer;
        let timeLeft;
        let playerName = '';
        let hintUsed = false;
        
        // Initialize the game
        function init() {
            totalQuestionsSpan.textContent = quizData.length;
            maxScoreSpan.textContent = quizData.length;
            
            startBtn.addEventListener('click', startQuiz);
            skipBtn.addEventListener('click', skipQuestion);
            restartBtn.addEventListener('click', restartQuiz);
            homeBtn.addEventListener('click', goHome);
            hintBtn.addEventListener('click', showHint);
            
            playerNameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    startQuiz();
                }
            });
        }
        
        // Begin the quiz
        function startQuiz() {
            playerName = playerNameInput.value.trim();
            
            if (!playerName) {
                nameError.style.display = 'block';
                playerNameInput.focus();
                return;
            }
            
            nameError.style.display = 'none';
            currentQuestion = 0;
            score = 0;
            currentScoreSpan.textContent = score;
            
            startScreen.classList.remove('active');
            quizScreen.classList.add('active');
            
            loadQuestion();
        }
        
        // Load a question
        function loadQuestion() {
            clearTimeout(timer);
            hintUsed = false;
            
            if (currentQuestion >= quizData.length) {
                endQuiz();
                return;
            }
            
            const questionData = quizData[currentQuestion];
            
            questionText.textContent = questionData.question;
            currentQuestionSpan.textContent = currentQuestion + 1;
            
            const progressPercentage = (currentQuestion / quizData.length) * 100;
            quizProgress.style.width = `${progressPercentage}%`;
            
            // Reset the hint
            hintText.classList.remove('show');
            hintBtn.textContent = '💡 Need a Hint? (Click me!)';
            hintBtn.disabled = false;
            
            optionsContainer.innerHTML = '';
            
            questionData.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.classList.add('option-btn');
                optionBtn.textContent = option;
                optionBtn.dataset.index = index;
                optionBtn.addEventListener('click', checkAnswer);
                optionsContainer.appendChild(optionBtn);
            });
            
            startTimer();
        }
        
        
        function showHint() {
            if (!hintUsed) {
                const questionData = quizData[currentQuestion];
                hintText.textContent = questionData.hint;
                hintText.classList.add('show');
                hintBtn.textContent = ' Hint Used!';
                hintBtn.disabled = true;
                hintUsed = true;
            }
        }
        
        // Start up the timer
        function startTimer() {
            timeLeft = 30;
            timerDisplay.textContent = timeLeft;
            
            timer = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = timeLeft;
                
                if (timeLeft <= 5) {
                    timerDisplay.style.color = '#e74c3c';
                } else {
                    timerDisplay.style.color = '#667eea';
                }
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    timeUp();
                }
            }, 1000);
        }
        
        // Make sure to handle the time 
        function timeUp() {
            const options = document.querySelectorAll('.option-btn');
            options.forEach((option, index) => {
                option.disabled = true;
                if (index === correctAnswers[currentQuestion]) {
                    option.classList.add('correct');
                }
            });
            
            hintBtn.disabled = true;
            setTimeout(nextQuestion, 2000);
        }
        
        // Check answer to see whether it correct or not
        function checkAnswer(e) {
            clearInterval(timer);
            timerDisplay.style.color = '#667eea';
            
            const selectedOption = parseInt(e.target.dataset.index);
            const correctOption = correctAnswers[currentQuestion];
            
            const options = document.querySelectorAll('.option-btn');
            options.forEach(option => {
                option.disabled = true;
            });
            
            hintBtn.disabled = true;
            
            if (selectedOption === correctOption) {
                e.target.classList.add('correct');
                score++;
                currentScoreSpan.textContent = score;
            } else {
                e.target.classList.add('incorrect');
                options[correctOption].classList.add('correct');
            }
            
            setTimeout(nextQuestion, 2000);
        }
        
        // Allow to skip question
        function skipQuestion() {
            clearInterval(timer);
            timerDisplay.style.color = '#667eea';
            
            const options = document.querySelectorAll('.option-btn');
            const correctOption = correctAnswers[currentQuestion];
            
            options.forEach(option => {
                option.disabled = true;
            });
            
            options[correctOption].classList.add('correct');
            hintBtn.disabled = true;
            
            setTimeout(nextQuestion, 1500);
        }
        
        // Move to next question
        function nextQuestion() {
            currentQuestion++;
            
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }
        
        // FINISH the quiz game
        function endQuiz() {
            finalScoreSpan.textContent = score;
            
            const percentage = (score / quizData.length) * 100;
            let message = '';
            
            if (percentage >= 80) {
                message = `Excellent work, ${playerName}! You got ${score} out of ${quizData.length} correct! You're basically a walking encyclopedia! 🏆`;
            } else if (percentage >= 60) {
                message = `Good job, ${playerName}! You got ${score} out of ${quizData.length} correct! Not bad at all at least you made your parents proud! 👏`;
            } else if (percentage >= 40) {
                message = `Not bad, ${playerName}! You got ${score} out of ${quizData.length} correct! Hey, at least you tried harder than most people with thier New Year's resolutions! `;
            } else {
                message = `Keep practicing, ${playerName}! You got ${score} out of ${quizData.length} correct! Remember, Google and Chatgbt is your friend for future reference! `;
            }

            resultsMessage.textContent = message;
            
            quizScreen.classList.remove('active');
            resultsScreen.classList.add('active');
            
            quizProgress.style.width = '100%';
        }
        
        // Restart the quiz game 
        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            currentScoreSpan.textContent = score;
            
            resultsScreen.classList.remove('active');
            quizScreen.classList.add('active');
            
            loadQuestion();
        }
        
        
        function goHome() {
            resultsScreen.classList.remove('active');
            startScreen.classList.add('active');
            
            quizProgress.style.width = '0%';
        }
        
        // start up immediatley when page loads
        document.addEventListener('DOMContentLoaded', init);