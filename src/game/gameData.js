// Vị trí: src/game/gameData.js

// Danh sách 11 thẻ bằng chứng (Bao gồm cả các thẻ gây nhiễu - Red Herring)
export const EVIDENCES = [
  {
    id: 'ev1',
    code: 'Evidence 01',
    title: 'LEE JAE-YONG',
    tag: 'SAMSUNG',
    desc: 'Phó Chủ tịch Samsung Electronics, người nắm quyền quyết định tối cao các chiến lược dài hạn.',
    isRedHerring: false
  },
  {
    id: 'ev2',
    code: 'Evidence 02',
    title: 'CRIMINAL CONVICTION',
    tag: 'LAW',
    desc: 'Lee bị kết án 2 năm 6 tháng tù trong vụ án hối lộ liên quan đến cựu Tổng thống Park Geun-hye.',
    isRedHerring: false
  },
  {
    id: 'ev3',
    code: 'Evidence 03',
    title: 'GLOBAL COMPETITION',
    tag: 'ECONOMY',
    desc: 'Hàn Quốc đối mặt lạm phát cao, bất ổn kinh tế và cuộc đua bán dẫn khốc liệt với TSMC (Đài Loan), Mỹ, Trung.',
    isRedHerring: false
  },
  {
    id: 'ev4',
    code: 'Evidence 04',
    title: 'SEMICONDUCTOR',
    tag: 'SAMSUNG',
    desc: 'Bán dẫn là trụ cột chiến lược sống còn (chiếm ~20% xuất khẩu Hàn Quốc), lá chắn an ninh quốc gia.',
    isRedHerring: false
  },
  {
    id: 'ev5',
    code: 'Evidence 05',
    title: 'SAMSUNG INVESTMENT',
    tag: 'SAMSUNG',
    desc: 'Kế hoạch siêu đầu tư 450.000 tỷ Won (355 tỷ USD) vào bán dẫn và sinh học cần chữ ký của lãnh đạo cao nhất.',
    isRedHerring: false
  },
  {
    id: 'ev6',
    code: 'Evidence 06',
    title: 'ECONOMIC RECOVERY',
    tag: 'GOVERNMENT',
    desc: 'Bộ Tư pháp nêu lý do đặc xá nhằm khôi phục sinh kế và huy động động lực vượt khủng hoảng kinh tế.',
    isRedHerring: false
  },
  {
    id: 'ev7',
    code: 'Evidence 07',
    title: 'JOB CREATION',
    tag: 'ECONOMY',
    desc: 'Các tập đoàn cam kết mở rộng sản xuất, riêng Samsung cam kết tạo thêm 80.000 việc làm mới.',
    isRedHerring: false
  },
  {
    id: 'ev8',
    code: 'Evidence 08',
    title: 'TECHNOLOGY INVESTMENT',
    tag: 'GOVERNMENT',
    desc: 'Chính phủ muốn thúc đẩy doanh nghiệp lớn tăng tốc đầu tư vào AI, 3nm chip và pin xe điện.',
    isRedHerring: false
  },
  {
    id: 'ev9',
    code: 'Evidence 09',
    title: 'CHAEBOL POWER',
    tag: 'CHAEBOL',
    desc: 'Top 10 Chaebol chiếm gần 80% GDP, tạo ra sự phụ thuộc kinh tế và ảnh hưởng quá lớn lên chính trị.',
    isRedHerring: false
  },
  {
    id: 'ev10',
    code: 'Evidence 10',
    title: 'SPECIAL TREATMENT',
    tag: 'PUBLIC',
    desc: 'Các tổ chức xã hội dân sự chỉ trích "Quy tắc 3-5" và sự ưu ái đặc quyền phá hoại nguyên tắc bình đẳng trước pháp luật.',
    isRedHerring: false
  },
  // --- CÁC THẺ GÂY NHIỄU (RED HERRINGS) ---
  {
    id: 'rh1',
    code: 'Evidence 11',
    title: 'SMARTPHONE LEADER',
    tag: 'FACT',
    desc: 'Samsung là một trong những nhà sản xuất điện thoại thông minh lớn nhất thế giới.',
    isRedHerring: true
  },
  {
    id: 'rh2',
    code: 'Evidence 12',
    title: 'FOUNDING FAMILY',
    tag: 'FACT',
    desc: 'Lee Jae-yong là thành viên thế hệ thứ 3 của gia tộc sáng lập tập đoàn Samsung.',
    isRedHerring: true
  }
];

// Ba câu hỏi điều tra ở Màn 2 và các thẻ đáp án đúng cần ghép vào
export const QUESTIONS = [
  {
    id: 'q1',
    number: 'QUESTION 01',
    question: 'Tại sao Lee Jae-yong lại được xem là quan trọng về mặt kinh tế?',
    requiredTags: ['SEMICONDUCTOR', 'SAMSUNG INVESTMENT', 'GLOBAL COMPETITION']
  },
  {
    id: 'q2',
    number: 'QUESTION 02',
    question: 'Chính phủ đã đưa ra lý do chính thức gì cho quyết định đặc xá?',
    requiredTags: ['ECONOMIC RECOVERY', 'JOB CREATION', 'TECHNOLOGY INVESTMENT']
  },
  {
    id: 'q3',
    number: 'QUESTION 03',
    question: 'Tại sao quyết định này lại gây tranh cãi dữ dội?',
    requiredTags: ['CHAEBOL POWER', 'CRIMINAL CONVICTION', 'SPECIAL TREATMENT']
  }
];