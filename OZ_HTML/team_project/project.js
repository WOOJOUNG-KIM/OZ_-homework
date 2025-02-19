// project.js

// 스크롤 이벤트 (필요 시 사용)
window.onscroll = function () {
  var button = document.getElementById("topButton");
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      button.style.display = "block";
  } else {
      button.style.display = "none";
  }
};

// 위로 스크롤하는 함수 (topButton 관련)
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 사용자 정보 및 폼 처리
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const registeredUsers = [];

// 로그인 폼 처리
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

   // 🔹 로컬 스토리지에서 저장된 회원 정보 가져오기
   let savedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

   
  // 등록된 사용자 배열에서 일치하는 정보 확인
  const user = savedUsers.find(u => u.email === email && u.password === password);
  if (user) { //user로 바꾸기
      // 로그인 성공 시 처리 (예: 관리자 페이지로 이동)
      alert("로그인 성공!");
      // 로그인 성공 시 로그인 섹션 숨기고 관리자 페이지 보여주기
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('adminSection').style.display = 'block';
      // 추가 동작 구현 가능


      // 폭죽 효과 실행
      fireworks();
  } else {
      alert('로그인 정보가 올바르지 않습니다. 회원가입 후 다시 시도해주세요.');
  }
});

//로그아웃
document.getElementById('logoutBtn').addEventListener('click', function () {
  document.getElementById('adminSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'flex';
});

document.getElementById('regPassword').addEventListener('focus', function () {
  validatePassword(); // 포커스 시 검증 실행
});

document.getElementById('regPassword').addEventListener('input', function () {
  validatePassword(); // 입력할 때 검증 실행
});

document.getElementById('regPassword').addEventListener('blur', function () {
  const passwordError = document.getElementById('passwordError');
  const passwordInput = document.getElementById('regPassword');

  passwordError.style.display = 'none'; // 포커스를 벗어나면 오류 메시지 숨김
  passwordInput.classList.remove('input-error'); // 빨간 테두리 제거
});

function validatePassword() {
  const password = document.getElementById('regPassword').value;
  const passwordInput = document.getElementById('regPassword');
  const passwordError = document.getElementById('passwordError');

  if (!passwordRegex.test(password) && passwordInput === document.activeElement) {
      passwordInput.classList.add('input-error'); // 빨간 테두리 적용
      passwordError.style.display = 'block'; // 오류 메시지 표시
  } else {
      passwordInput.classList.remove('input-error'); // 정상 입력 시 테두리 제거
      passwordError.style.display = 'none'; // 오류 메시지 숨김
  }
}


document.getElementById('regConfirmPassword').addEventListener('focus', function () {
  validateConfirmPassword(); // 포커스 되면 검증 실행
});

document.getElementById('regConfirmPassword').addEventListener('input', function () {
  validateConfirmPassword();
});

document.getElementById('regConfirmPassword').addEventListener('blur', function () {
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  confirmPasswordError.style.display = 'none'; // 포커스가 벗어나면 숨김
});

function validateConfirmPassword() {
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const confirmPasswordInput = document.getElementById('regConfirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  if (password !== confirmPassword && confirmPasswordInput === document.activeElement) {
      confirmPasswordInput.classList.add('input-error'); // 빨간 테두리 적용
      confirmPasswordError.style.display = 'block'; // 오류 메시지 표시
  } else {
      confirmPasswordInput.classList.remove('input-error'); // 정상 입력 시 테두리 제거
      confirmPasswordError.style.display = 'none'; // 오류 메시지 숨김
  }
}


// 회원가입 폼 처리
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const genderElems = document.getElementsByName('regGender');
  let gender = '';
  for (const elem of genderElems) {
      if (elem.checked) {
          gender = elem.value;
          break;
      }
  }
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  if (!passwordRegex.test(password)) {
      alert('비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
  }
  if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
  }
  registeredUsers.push({ username, email, password });

  // 로컬 스토리지에서 기존 저장된 회원 정보 가져오기
  let savedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  // 중복 회원 확인
  if (savedUsers.some(user => user.email === email)) {
      alert("이미 등록된 이메일입니다.");
      return;
  }

  // 새 사용자 추가
  const newUser = { username, email, password, gender };
  savedUsers.push(newUser);

  // 수정된 회원 정보 다시 로컬 스토리지에 저장
  localStorage.setItem("registeredUsers", JSON.stringify(savedUsers));
  // 중복 저장 방지를 위해 두 번 저장하지 않음
  alert(`${username} (${gender})님의 회원가입이 완료되었습니다.`);
  this.reset();
  // 회원가입 완료 후, 체크박스(회원가입/로그인 전환)를 해제해 3D 카드가 로그인 화면으로 돌아가도록 함
  document.getElementById("reg-log").checked = false;
});

// 다크모드 토글
let isDarkMode = false;
function toggleDarkMode(event) {
  event.preventDefault();
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  document.getElementById('darkModeToggle').innerText = isDarkMode ? '기본모드' : '다크모드';
  document.querySelectorAll('.table, .form-select, .form-control, .pagination, h3, .btn-dark-mode')
      .forEach(el => el.classList.toggle('dark-mode', isDarkMode));
}

// 날짜와 시간 업데이트
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('ko-KR');
  const time = now.toLocaleTimeString('ko-KR');
  document.getElementById('date-time').innerText = date + " " + time;
}
updateDateTime();
setInterval(updateDateTime, 1000);

// 상품 데이터 생성
const categories = ["상의", "하의", "신발", "패션잡화"];
const brands = ["Nike", "Adidas", "Puma", "Reebok", "Vans", "Levi's", "Zara", "Uniqlo", "Converse", "Tommy Hilfiger", "Supreme", "H&M", "Champion", "Fila", "Carhartt", "Patagonia", "Ralph Lauren", "Bape", "The North Face", "Under Armour"];
const products = ["후드티", "트랙 팬츠", "에어맥스 97", "레트로 백팩", "스포츠 반팔티", "스트레이트 팬츠", "슈퍼스타", "슬림벨트", "후드 집업", "조거 팬츠", "990v5", "레더 장지갑", "그래픽 반팔티", "슬림핏 청바지", "클래식 레더", "스포츠 캡", "로고 맨투맨", "플렉스 트랙 팬츠", "올드스쿨", "러닝 시계", "테크핏 티셔츠", "카고 팬츠", "커맨드 트레일", "로고 토트백", "피케 셔츠", "청반바지", "척 70", "클러치백", "워크 자켓", "슬랙스", "고스트 14", "지갑", "폴로 티셔츠", "데님 팬츠", "젤-카야노", "GG 마몬트 벨트백", "플리스 자켓", "반바지", "스웨이드 클래식", "피카부 백팩", "드라이핏 반팔티", "슬림핏 청바지", "1 로우", "레더 토트백", "카모 후디", "조거 팬츠", "클래식 레더", "시그니처 팔찌", "컬러블록 후디", "레귤러핏 팬츠", "슬립온", "크리스탈 목걸이", "고어텍스 자켓", "다운 팬츠", "슬라이드", "디지털 시계", "기능성 티셔츠", "쿨워크 팬츠", "골프 슈즈", "마트라세 퀼팅 백", "어드벤쳐 자켓", "베이직 슬랙스", "프리몬트", "보드리 장지갑", "새로운 상품"];

const generatePrice = () => {
  const price = Math.floor(Math.random() * 500000) + 5000;
  const priceRounded = Math.floor(price / 100) * 100;
  return priceRounded.toLocaleString();
};

const product_data = [];
for (let i = 0; i < 5000; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const product = products[Math.floor(Math.random() * products.length)];
  const price = generatePrice();
  const gender = Math.random() < 0.5 ? "남성" : "여성";
  product_data.push({ category, brand, product, price, gender });
}

let filteredProducts = [...product_data];
const productsPerPage = 20;
let currentPage = 1;
const maxVisiblePages = 5;

function displayProducts(page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const tableBody = document.getElementById('product_data_Table');
  tableBody.innerHTML = '';
  displayedProducts.forEach(item => {
      const row = tableBody.insertRow();
      row.insertCell(0).innerText = item.category;
      row.insertCell(1).innerText = item.brand;
      row.insertCell(2).innerText = item.product;
      row.insertCell(3).innerText = item.gender;
      row.insertCell(4).innerText = item.price;
  });
}

function setupPagination() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  let startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // 첫 페이지 버튼 (<<)
  const firstLi = document.createElement('li');
  firstLi.classList.add('page-item');
  const firstA = document.createElement('a');
  firstA.classList.add('page-link');
  firstA.href = "#";
  firstA.innerHTML = "&laquo;&laquo;";
  firstA.onclick = function () {
      currentPage = 1;
      displayProducts(currentPage);
      setupPagination();
  };
  if (currentPage === 1) firstLi.classList.add('disabled');
  firstLi.appendChild(firstA);
  pagination.appendChild(firstLi);

  // 이전 페이지 버튼 (<)
  const prevLi = document.createElement('li');
  prevLi.classList.add('page-item');
  const prevA = document.createElement('a');
  prevA.classList.add('page-link');
  prevA.href = "#";
  prevA.innerHTML = "&lt;";
  prevA.onclick = function () {
      currentPage--;
      displayProducts(currentPage);
      setupPagination();
  };
  if (currentPage === 1) prevLi.classList.add('disabled');
  prevLi.appendChild(prevA);
  pagination.appendChild(prevLi);

  // 페이지 번호 버튼
  for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      if (i === currentPage) li.classList.add('active');
      const a = document.createElement('a');
      a.classList.add('page-link');
      a.href = "#";
      a.innerText = i;
      a.onclick = function () {
          currentPage = i;
          displayProducts(currentPage);
          setupPagination();
      };
      li.appendChild(a);
      pagination.appendChild(li);
  }

  // 다음 페이지 버튼 (>)
  const nextLi = document.createElement('li');
  nextLi.classList.add('page-item');
  const nextA = document.createElement('a');
  nextA.classList.add('page-link');
  nextA.href = "#";
  nextA.innerHTML = "&gt;";
  nextA.onclick = function () {
      currentPage++;
      displayProducts(currentPage);
      setupPagination();
  };
  if (currentPage === totalPages) nextLi.classList.add('disabled');
  nextLi.appendChild(nextA);
  pagination.appendChild(nextLi);

  // 마지막 페이지 버튼 (>>)
  const lastLi = document.createElement('li');
  lastLi.classList.add('page-item');
  const lastA = document.createElement('a');
  lastA.classList.add('page-link');
  lastA.href = "#";
  lastA.innerHTML = "&raquo;&raquo;";
  lastA.onclick = function () {
      currentPage = totalPages;
      displayProducts(currentPage);
      setupPagination();
  };
  if (currentPage === totalPages) lastLi.classList.add('disabled');
  lastLi.appendChild(lastA);
  pagination.appendChild(lastLi);
}

function filterProducts() {
  const searchQuery = document.getElementById('productSearch').value.toLowerCase();
  const selectedCategory = document.getElementById('categorySelect').value;
  const selectedGender = document.getElementById('genderSelect').value;
  filteredProducts = product_data.filter(item => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesGender = selectedGender ? item.gender === selectedGender : true;
      const matchesSearch = item.product.toLowerCase().includes(searchQuery) ||
                            item.brand.toLowerCase().includes(searchQuery); // 브랜드 와 재품 검색 가능
      return matchesCategory && matchesGender && matchesSearch;
  });
  currentPage = 1;
  displayProducts(currentPage);
  setupPagination();
}


// 폭죽 효과 함수
function fireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");

  // 캔버스 크기 설정
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 5 + 2;
    this.gravity = 0.05;
    this.alpha = 1;
    this.fade = Math.random() * 0.03 + 0.02;

    this.update = function () {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.fade;
    };

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    };
  }

  function createExplosion(x, y) {
    const colors = [
      "255, 99, 71",   // 빨강
      "50, 205, 50",   // 초록
      "65, 105, 225",  // 파랑
      "255, 215, 0",   // 노랑
      "148, 0, 211",   // 보라
    ];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, i) => {
      particle.update();
      particle.draw();
      if (particle.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
  }

  // 캔버스 클릭할 때도 폭죽 터지도록 추가
  canvas.addEventListener("click", (e) => {
    createExplosion(e.clientX, e.clientY);
  });

  // 폭죽 3초 동안 자동 실행
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createExplosion(Math.random() * canvas.width, Math.random() * canvas.height);
    }, i * 500);
  }

  animate();

  // 3초 후 캔버스 숨기기
  setTimeout(() => {
    canvas.style.display = "none";
  }, 3000);
}

displayProducts(currentPage);
setupPagination();
