export interface Ii18nStatistics {
    header: string;
    answersTotal: string;
    rightAnswers: string;
    rightAnswersFromFirstTry: string;
    rightAnswersFromSecondTry: string;
    rightAnswersFromThirdTry: string;
    wrongAnswers: string;
}

export class i18nStatisticsUA implements Ii18nStatistics {
    header = "Статистика";
    answersTotal = "Всього відповідей";
    rightAnswers = "Вірних відповідей";
    rightAnswersFromFirstTry = "з першої спроби";
    rightAnswersFromSecondTry = "з другої спроби";
    rightAnswersFromThirdTry = "з третьої спроби";
    wrongAnswers = "Хибних відповідей";
}

export class i18nStatisticsEN implements Ii18nStatistics {
    header = "Statistics";
    answersTotal = "Answers total";
    rightAnswers = "Right answers";
    rightAnswersFromFirstTry = "from first try";
    rightAnswersFromSecondTry = "from second try";
    rightAnswersFromThirdTry = "from third try";
    wrongAnswers = "Wrong answers";
}
