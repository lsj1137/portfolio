import CareerLine from "./CareerLine";

export default function Career() {
  let dateList = [
    "2021. 08.",
    "2022. 08.",
    "2022. 11.",
    "2023. 12.",
    "2024. 08.",
    "2024. 09. - 2024. 12.",
    "2025. 01. - 2025. 02.",
    "2025. 02.",
    "2025. 02.",
  ];
  let contentList = [
    "[ 장려상🥉 ]  영화 빅데이터 구축･활용 과제 발굴을 위한 아이디어 공모전 (한국영상자료원)",
    "[ 장려상🥉 ]  2022년 SW공모전 (경영경제대학 x SW중심대학 해커톤) (단국대학교 SW중심대학사업단)",
    "[ 동상🥉 ]  단국대-다우기술 프로그래밍 경진대회 (다우기술)",
    "[ 금상🥇 ]  단국대학교 캡스톤디자인 경진대회 (단국대학교)",
    "[ 후원기업상🏅 ]  2024 SW중심대학 디지털 경진대회 (SW중심대학협의회)",
    "엘림주식회사 인턴 근무 - 모바일 앱 개발 담당",
    "[ 수료 🎓 ]  HMG 소프티어 부트캠프 5기 웹 프론트엔드 과정 수료",
    "[ 우수소프티어상🥈 ]  HMG 소프티어 부트캠프 5기 프로젝트 최종심사 (현대자동차그룹 ICT본부)",
    "[ 졸업 🎓 ]  단국대학교 컴퓨터공학과 학사 졸업",
  ];
  return (
    <div className="flex flex-col h-dvh gap-10">
      {dateList.map((date, i) => (
        <CareerLine
          key={i}
          date={date}
          isPeriod={date.length > 10}
          content={contentList[i]}
        />
      ))}
    </div>
  );
}
