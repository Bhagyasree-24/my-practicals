let currentIndex = 0;
let score = 0;

const questions = [
    {
        q: "What is the main difference between Spear Phishing and Whaling?",
        options: ["Spear targets companies, Whaling targets individuals", "Whaling targets high-profile executives", "Spear uses AI, Whaling uses malware", "No difference"],
        ans: "Whaling targets high-profile executives"
    },
    {
        q: "Which hashing algorithm is currently considered most secure for password storage?",
        options: ["SHA-256", "bcrypt with high work factor", "MD5", "SHA-512"],
        ans: "bcrypt with high work factor"
    },
    {
        q: "What does 'Zero Trust' architecture assume by default?",
        options: ["Everyone inside network is trusted", "No one is trusted", "Only admins are trusted", "Only devices with antivirus are trusted"],
        ans: "No one is trusted"
    },
    {
        q: "What is a 'Supply Chain Attack'?",
        options: ["Attacking internet cables", "Compromising software vendors to attack customers", "Stealing data from warehouses", "DDoS attack on suppliers"],
        ans: "Compromising software vendors to attack customers"
    },
    {
        q: "Which protocol encrypts DNS queries to prevent ISP snooping and DNS hijacking?",
        options: ["HTTPS", "DNSSEC", "DoH (DNS over HTTPS)", "TLS 1.3"],
        ans: "DoH (DNS over HTTPS)"
    },
    {
        q: "What is the biggest risk of using public Wi-Fi without a VPN?",
        options: ["Slow internet", "Man-in-the-Middle attacks", "Phone overheating", "Data quota usage"],
        ans: "Man-in-the-Middle attacks"
    },
    {
        q: "In ransomware, what is 'Double Extortion'?",
        options: ["Encrypting data + threatening to leak it", "Attacking two companies at once", "Demanding two payments", "Using two malware types"],
        ans: "Encrypting data + threatening to leak it"
    },
    {
        q: "What technique do attackers use to bypass 2FA using real-time interception?",
        options: ["SIM Swapping", "Real-time phishing / Adversary-in-the-Middle", "Brute force", "Keylogging"],
        ans: "Real-time phishing / Adversary-in-the-Middle"
    },
    {
        q: "Which of the following is the strongest password policy?",
        options: ["12 characters with symbols", "Passphrases of 20+ characters", "8 characters with numbers", "Only biometrics"],
        ans: "Passphrases of 20+ characters"
    },
    {
        q: "What is the purpose of 'CANARY Token' in cybersecurity?",
        options: ["Detect unauthorized access to files", "Block malware", "Encrypt data", "Speed up network"],
        ans: "Detect unauthorized access to files"
    },
    {
        q: "What does 'Living off the Land (LotL)' attack mean?",
        options: ["Using legitimate system tools to attack", "Living in forest to hack", "Attacking from inside country", "Using solar power for servers"],
        ans: "Using legitimate system tools to attack"
    }
];

function loadQuestion() {
    const q = questions[currentIndex];
    document.getElementById("question").textContent = q.q;
    document.getElementById("current-q").textContent = currentIndex + 1;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "w-full text-left p-5 rounded-2xl bg-gray-800 hover:bg-gray-700 text-lg transition";
        btn.textContent = option;
        btn.onclick = () => selectAnswer(option);
        optionsDiv.appendChild(btn);
    });

    document.getElementById("feedback").classList.add("hidden");
    document.getElementById("next").classList.add("hidden");
}

function selectAnswer(selected) {
    const correct = questions[currentIndex].ans;
    const feedback = document.getElementById("feedback");

    if (selected === correct) {
        score += 10;
        feedback.innerHTML = `✅ <span class="text-emerald-400 font-bold">Correct!</span>`;
        feedback.className = "mt-8 p-6 rounded-2xl bg-emerald-900/30 border border-emerald-500 text-center";
    } else {
        feedback.innerHTML = `❌ Wrong! <br><span class="text-red-400">Correct Answer: ${correct}</span>`;
        feedback.className = "mt-8 p-6 rounded-2xl bg-red-900/30 border border-red-500 text-center";
    }

    feedback.classList.remove("hidden");
    document.getElementById("score").textContent = score;
    document.getElementById("next").classList.remove("hidden");
}

document.getElementById("next").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");

    const percentage = score;
    document.getElementById("final-score").textContent = `${percentage}%`;

    const msg = document.getElementById("message");
    if (percentage >= 120) msg.textContent = "🏆 Outstanding! You are a Cyber Security Expert!";
    else if (percentage >= 90) msg.textContent = "🎯 Excellent Performance!";
    else if (percentage >= 60) msg.textContent = "👍 Good! Keep improving.";
    else msg.textContent = "Keep learning. Cybersecurity knowledge needs regular practice.";
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    loadQuestion();
}

// Start Quiz
loadQuestion();