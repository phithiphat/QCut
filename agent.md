QCut: แพลตฟอร์มจองคิวร้านตัดผม (API)
"QCut" คือระบบ API สำหรับแพลตฟอร์มจองคิวร้านตัดผม สร้างขึ้นเพื่อแก้ปัญหาการจัดการคิว เชื่อมต่อลูกค้า, ช่างตัดผม และเจ้าของร้านเข้าด้วยกัน

ปัญหาที่แก้ไข (Problem Statement)
ปัจจุบันร้านตัดผมจำนวนมากยังใช้การจองผ่าน Line หรือโทรศัพท์ ทำให้การจัดการคิวซับซ้อน, ข้อมูลตกหล่น, และลูกค้าไม่เห็นภาพรวมว่าเวลาไหนว่างบ้าง โปรเจกต์นี้จะช่วยให้ร้านค้ามีระบบจัดการการจองที่เป็นระบบ และลูกค้าสามารถจองบริการได้เอง 24 ชั่วโมง

Tech Stack

**Frontend (ส่วนหน้าบ้าน):**
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router

**Backend (ส่วนหลังบ้าน):**
- **Framework**: Spring Boot (Java)
- **Security**: Spring Security (JWT Authentication)
- **Database Access**: Spring Data JPA (Hibernate)
- **API Documentation**: Swagger UI / OpenAPI

**Database (ฐานข้อมูล):**
- **Database**: MySQL หรือ PostgreSQL

**Tools (เครื่องมือ):**
- **Version Control**: Git
- **API Testing**: Postman


Features (ฟีเจอร์หลัก)
ระบบยืนยันตัวตน: Login/Register สำหรับลูกค้าและเจ้าของร้าน (ผ่าน Spring Security)
ระบบจองคิว: ลูกค้าสามารถเลือก ช่าง, บริการ และ ช่วงเวลาที่ว่าง (Time Slot) ได้
ระบบค้นหา: ค้นหาช่องเวลาว่างของช่างแต่ละคนแบบ Real-time
ระบบจัดการคิว (Dashboard): ช่าง/เจ้าของร้าน สามารถ ยืนยัน(Confirm), ปฏิเสธ(Reject) คิว และ บล็อกเวลา(Block Time) ของตัวเองได้
ระบบจัดการร้าน: เจ้าของร้านสามารถ เพิ่ม/ลบ/แก้ไข บริการ และ ช่างตัดผม ในร้านของตนเองได้

บทบาทของ AI ในการช่วยพัฒนาโครงงาน
1. **ช่วยวิเคราะห์ปัญหา (Problem Definition)**  
   ใช้ AI ช่วยสรุปปัญหาที่พบในร้านตัดผมทั่วไป และวิเคราะห์ความต้องการของผู้ใช้

2. **ช่วยออกแบบฟีเจอร์ (Feature Design)**  
   AI ช่วยเสนอแนวทางการจัดระบบร้าน, ระบบจองคิว, และ Dashboard ให้เหมาะกับผู้ใช้งานจริง

3. **ช่วยเขียนเอกสารโครงงาน (Documentation)**  
   ใช้ AI ในการร่าง Problem Statement, Core Features และ Tech Stack ให้มีความชัดเจน

4. **ช่วยออกแบบโครงสร้างระบบ (System Architecture)**  
   AI แนะนำการเชื่อมต่อระหว่าง Backend (Spring Boot) และ Frontend (React)