export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <article className="prose prose-sm prose-headings:font-bold prose-h3:text-2xl prose-h4:text-xl prose-p:text-base prose-li:text-base md:prose-base max-w-none">
        <h1 className="text-3xl font-bold">개인정보처리방침</h1>

        <p className="mt-4">
          <strong>WorkRoot</strong>는 사용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 및 관련 법령을 준수하고
          있습니다. 본 개인정보처리방침은 <strong>WorkRoot</strong>가 제공하는 서비스와 관련하여 사용자의 개인정보를
          어떻게 수집, 이용, 보관 및 보호하는지에 대한 내용을 담고 있습니다.
        </p>

        <hr className="my-8" />

        <section>
          <h3>1. 개인정보의 수집 항목 및 수집 방법</h3>
          <p>
            <strong>WorkRoot</strong>는 서비스 이용을 위해 필요한 최소한의 개인정보만을 수집합니다.
          </p>

          <h4>1.1 수집 항목</h4>
          <ul>
            <li>
              <strong>회원가입 시</strong>
              <ul>
                <li>필수: 이름, 이메일 주소, 비밀번호</li>
                <li>선택: 전화번호, 프로필 사진</li>
              </ul>
            </li>
            <li>
              <strong>소셜 로그인 이용 시</strong>
              <ul>
                <li>OAuth 제공자로부터 제공되는 이름, 이메일, 프로필 사진 등</li>
              </ul>
            </li>
            <li>
              <strong>서비스 이용 시</strong>
              <ul>
                <li>서비스 이용 기록, 접속 로그, IP 주소, 쿠키 정보, 기기 정보</li>
              </ul>
            </li>
          </ul>

          <h4>1.2 수집 방법</h4>
          <ul>
            <li>회원가입 및 서비스 이용 과정에서 사용자가 직접 입력</li>
            <li>소셜 로그인 연동 시 외부 플랫폼으로부터 제공</li>
            <li>서비스 이용 과정에서 자동으로 수집</li>
          </ul>
        </section>

        <hr className="my-8" />

        <section>
          <h3>2. 개인정보의 이용 목적</h3>
          <p>
            <strong>WorkRoot</strong>는 수집된 개인정보를 다음의 목적으로 사용합니다:
          </p>
          <ol>
            <li>
              서비스 제공 및 회원 관리
              <ul>
                <li>회원가입, 본인 인증, 계정 관리</li>
                <li>서비스 이용 기록 관리 및 맞춤형 서비스 제공</li>
              </ul>
            </li>
            <li>
              고객 지원
              <ul>
                <li>사용자 문의 응답 및 문제 해결</li>
              </ul>
            </li>
            <li>
              마케팅 및 광고
              <ul>
                <li>사용자 동의하에 맞춤형 광고 제공 및 이벤트 정보 전달</li>
              </ul>
            </li>
            <li>
              법적 의무 준수
              <ul>
                <li>관련 법령에 따른 의무 이행</li>
              </ul>
            </li>
          </ol>
        </section>

        <hr className="my-8" />

        <section>
          <h3>3. 개인정보의 보관 및 파기</h3>
          <h4>3.1 보관 기간</h4>
          <ul>
            <li>
              회원 탈퇴 시: 즉시 삭제, 단 법령에서 정한 경우 일정 기간 보관
              <ul>
                <li>전자상거래법에 따른 계약 또는 청약 철회 기록: 5년</li>
                <li>소비자 불만 또는 분쟁 처리 기록: 3년</li>
                <li>로그인 기록: 1년</li>
              </ul>
            </li>
          </ul>

          <h4>3.2 파기 절차 및 방법</h4>
          <ul>
            <li>
              <strong>파기 절차</strong>: 보유 기간이 만료되거나 처리 목적이 달성된 개인정보는 즉시 파기
            </li>
            <li>
              <strong>파기 방법</strong>:
              <ul>
                <li>전자적 파일 형태: 복구 불가능한 방식으로 영구 삭제</li>
                <li>문서 형태: 분쇄 또는 소각</li>
              </ul>
            </li>
          </ul>
        </section>

        <hr className="my-8" />

        <section>
          <h3>4. 개인정보의 제3자 제공</h3>
          <p>
            <strong>WorkRoot</strong>는 사용자의 동의 없이는 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에서
            요구하거나 사용자가 동의한 경우에 한하여 제공합니다.
          </p>
        </section>

        <hr className="my-8" />

        <section>
          <h3>5. 개인정보의 처리 위탁</h3>
          <p>
            <strong>WorkRoot</strong>는 서비스 제공을 위해 필요한 경우 개인정보 처리를 외부 기관에 위탁할 수 있습니다.
            위탁 계약 시 개인정보 보호 관련 법규를 준수하며, 위탁받은 기관에 대한 관리를 철저히 합니다.
          </p>
        </section>

        <hr className="my-8" />

        <section>
          <h3>6. 개인정보 보호를 위한 기술적·관리적 대책</h3>
          <ul>
            <li>
              <strong>기술적 대책</strong>:
              <ul>
                <li>데이터 암호화</li>
                <li>방화벽 및 보안 솔루션 운영</li>
              </ul>
            </li>
            <li>
              <strong>관리적 대책</strong>:
              <ul>
                <li>개인정보 접근 권한 최소화</li>
                <li>정기적인 보안 점검 및 교육 실시</li>
              </ul>
            </li>
          </ul>
        </section>

        <hr className="my-8" />

        <section>
          <h3>7. 사용자 권리 및 행사 방법</h3>
          <p>사용자는 언제든지 자신의 개인정보에 대해 다음의 권리를 행사할 수 있습니다:</p>
          <ol>
            <li>개인정보 열람, 수정, 삭제 요청</li>
            <li>처리 정지 요청</li>
            <li>동의 철회 요청</li>
          </ol>
          <p>요청은 서비스 내 설정 페이지나 고객센터를 통해 가능합니다.</p>
        </section>

        <hr className="my-8" />

        <section>
          <h3>8. 개인정보 보호책임자</h3>
          <p>
            <strong>WorkRoot</strong>는 개인정보 처리와 관련된 문의, 불만 처리 및 피해 구제를 위해 아래와 같은 개인정보
            보호책임자를 지정하고 있습니다:
          </p>
          <ul>
            <li>
              <strong>책임자</strong>: 김원
            </li>
            <li>
              <strong>연락처</strong>: cccwon2@kakao.com
            </li>
          </ul>
        </section>

        <hr className="my-8" />

        <section>
          <h3>9. 정책 변경</h3>
          <p>
            <strong>WorkRoot</strong>는 본 개인정보처리방침을 변경할 수 있으며, 변경 시 서비스 공지사항 또는 이메일을
            통해 사전에 고지합니다.
          </p>
          <ul>
            <li>시행일: 2024년 12월 27일</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
