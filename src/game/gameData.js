// Vị trí: src/game/gameData.js
// Nội dung đã chỉnh theo hướng phân biệt dữ kiện lịch sử, lập luận của chính phủ
// và quan điểm phản biện. Giữ nguyên title/id để không làm hỏng logic ghép ở Màn 2.

export const EVIDENCES = [
  {
    id: 'ev1',
    code: 'Evidence 01',
    title: 'LEE JAE-YONG',
    tag: 'SAMSUNG',
    desc: 'Phó Chủ tịch Samsung Electronics và nhân vật lãnh đạo chủ chốt của tập đoàn. Việc ông có thể tham gia đầy đủ hơn vào hoạt động quản trị là một phần trọng tâm của tranh luận năm 2022.',
    isRedHerring: false
  },
  {
    id: 'ev2',
    code: 'Evidence 02',
    title: 'CRIMINAL CONVICTION',
    tag: 'LAW',
    desc: 'Tháng 1/2021, Lee Jae-yong bị tuyên mức án 2 năm 6 tháng tù trong vụ án hối lộ liên quan đến cựu Tổng thống Park Geun-hye và Choi Soon-sil.',
    isRedHerring: false
  },
  {
    id: 'ev3',
    code: 'Evidence 03',
    title: 'GLOBAL COMPETITION',
    tag: 'ECONOMY',
    desc: 'Samsung phải cạnh tranh trong ngành bán dẫn toàn cầu giữa lúc kinh tế thế giới đối mặt lạm phát, bất ổn chuỗi cung ứng và nguy cơ suy giảm tăng trưởng. Đây là bối cảnh được viện dẫn trong lập luận cần tăng tốc các quyết định kinh doanh.',
    isRedHerring: false
  },
  {
    id: 'ev4',
    code: 'Evidence 04',
    title: 'SEMICONDUCTOR',
    tag: 'SAMSUNG',
    desc: 'Bán dẫn là lĩnh vực chiến lược của Samsung và có vai trò quan trọng đối với năng lực công nghệ, xuất khẩu và vị thế cạnh tranh của Hàn Quốc. Tuy nhiên, vai trò kinh tế của ngành không tự động chứng minh rằng một cá nhân cần được đặc xá.',
    isRedHerring: false
  },
  {
    id: 'ev5',
    code: 'Evidence 05',
    title: 'SAMSUNG INVESTMENT',
    tag: 'SAMSUNG',
    desc: 'Tháng 5/2022, Samsung công bố kế hoạch đầu tư khoảng 450 nghìn tỷ won trong 5 năm vào các lĩnh vực như bán dẫn, sinh học và công nghệ thế hệ mới. Đây là kế hoạch của tập đoàn, không nên diễn đạt rằng toàn bộ kế hoạch chỉ có thể thực hiện khi Lee được đặc xá.',
    isRedHerring: false
  },
  {
    id: 'ev6',
    code: 'Evidence 06',
    title: 'ECONOMIC RECOVERY',
    tag: 'GOVERNMENT',
    desc: 'Chính phủ của Tổng thống Yoon Suk Yeol nêu mục tiêu ổn định sinh kế người dân và giúp đất nước vượt qua khó khăn kinh tế khi giải thích quyết định đặc xá dịp Quốc khánh Giải phóng 15/8.',
    isRedHerring: false
  },
  {
    id: 'ev7',
    code: 'Evidence 07',
    title: 'JOB CREATION',
    tag: 'ECONOMY',
    desc: 'Chính phủ viện dẫn vai trò của các doanh nghiệp lớn trong đầu tư và tạo việc làm. Đây là kỳ vọng chính sách được dùng để bảo vệ quyết định, không phải bằng chứng rằng riêng việc đặc xá Lee chắc chắn tạo ra một số lượng việc làm cụ thể.',
    isRedHerring: false
  },
  {
    id: 'ev8',
    code: 'Evidence 08',
    title: 'TECHNOLOGY INVESTMENT',
    tag: 'GOVERNMENT',
    desc: 'Lập luận của chính phủ nhấn mạnh việc thúc đẩy đầu tư công nghệ và năng lực cạnh tranh quốc gia. Việc Lee được đặc xá được kỳ vọng giúp ông tham gia đầy đủ hơn vào các quyết định quản trị và kinh doanh của Samsung.',
    isRedHerring: false
  },
  {
    id: 'ev9',
    code: 'Evidence 09',
    title: 'CHAEBOL POWER',
    tag: 'CHAEBOL',
    desc: 'Chaebol là các tập đoàn lớn do gia đình kiểm soát, có ảnh hưởng sâu rộng trong nền kinh tế Hàn Quốc. Sự tập trung quyền lực kinh tế làm dấy lên lo ngại về ảnh hưởng của các tập đoàn đối với chính sách và đời sống công chúng.',
    isRedHerring: false
  },
  {
    id: 'ev10',
    code: 'Evidence 10',
    title: 'SPECIAL TREATMENT',
    tag: 'PUBLIC',
    desc: 'Các tổ chức xã hội dân sự và người chỉ trích lo ngại việc đặc xá lãnh đạo chaebol có thể tạo ra cảm nhận rằng người giàu và quyền lực được hưởng sự khoan hồng đặc biệt, làm suy yếu niềm tin vào nguyên tắc bình đẳng trước pháp luật.',
    isRedHerring: false
  },

  // CÁC THẺ GÂY NHIỄU: là thông tin có thật nhưng không trực tiếp trả lời
  // ba câu hỏi điều tra về lý do kinh tế, lý do chính thức và tranh cãi pháp quyền.
  {
    id: 'rh1',
    code: 'Evidence 11',
    title: 'SMARTPHONE LEADER',
    tag: 'FACT',
    desc: 'Samsung là một trong những thương hiệu lớn trên thị trường điện thoại thông minh toàn cầu. Thông tin này đúng nhưng không trực tiếp giải thích lý do đặc xá năm 2022.',
    isRedHerring: true
  },
  {
    id: 'rh2',
    code: 'Evidence 12',
    title: 'FOUNDING FAMILY',
    tag: 'FACT',
    desc: 'Lee Jae-yong thuộc thế hệ thứ ba của gia đình sáng lập Samsung. Đây là thông tin tiểu sử, không trực tiếp chứng minh tính cần thiết hay tính chính đáng của quyết định đặc xá.',
    isRedHerring: true
  }
];

export const QUESTIONS = [
  {
    id: 'q1',
    number: 'QUESTION 01',
    question: 'Vì sao chính phủ và giới kinh doanh cho rằng việc Lee Jae-yong được khôi phục đầy đủ quyền điều hành có thể có lợi cho kinh tế Hàn Quốc?',
    requiredTags: [
      'SEMICONDUCTOR',
      'SAMSUNG INVESTMENT',
      'GLOBAL COMPETITION'
    ]
  },
  {
    id: 'q2',
    number: 'QUESTION 02',
    question: 'Chính phủ Yoon Suk Yeol viện dẫn những mục tiêu chính sách nào để giải thích quyết định đặc xá?',
    requiredTags: [
      'ECONOMIC RECOVERY',
      'JOB CREATION',
      'TECHNOLOGY INVESTMENT'
    ]
  },
  {
    id: 'q3',
    number: 'QUESTION 03',
    question: 'Vì sao quyết định đặc xá gây tranh cãi về công lý và ảnh hưởng của các tập đoàn lớn?',
    requiredTags: [
      'CHAEBOL POWER',
      'CRIMINAL CONVICTION',
      'SPECIAL TREATMENT'
    ]
  }
];
