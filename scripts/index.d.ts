export declare class WrongAnswerGiven {
}
export declare class RightAnswerGiven {
    attempts: number;
    constructor(attempts: number);
}

export declare class SettingsChanged {
    allowedOperations: Array<Operations>;
    operationsCount: number;
    operandDimention: number;
}

import { EquationsModel } from "../models/EquationsModel";
import { IEquationService } from "../../services";
export declare class EquationsModelHandler {
    private _model;
    private _equationService;
    private _bus;
    constructor(_model: EquationsModel, _equationService: IEquationService, _bus: ABus);
    private _equationSettings;
    private _equation;
    private _attemptsCounter;
    private handleSettingsChanged();
    private handleAnswer();
    private generateEquation();
}

import { SettingsModel } from "../models/SettingsModel";
import { SettingsChanged } from "../events";
export declare class SettingsModelHandler {
    private _model;
    private _bus;
    constructor(_model: SettingsModel, _bus: ABus);
    private previousAllowedOperations;
    private saveInitialState(settings);
    private handleAllowedOperations(settings);
    private handleOperationsCount(settings);
    private handleOperandDimention(settings);
    modelToEvent(settings: SettingsModel): SettingsChanged;
}

import { ABus } from "abus";
export declare class StatisticsModelHandler {
    private _model;
    private _bus;
    constructor(_model: StatisticsModel, _bus: ABus);
    private handleWrongAnswerGiven();
    private handleRightAnswerGiven();
}

import { Ii18nStatistics, i18nStatisticsUA, i18nStatisticsEN } from "./i18n.statistics";
export interface Ii18n {
    settings: Ii18nSettings;
    statistics: Ii18nStatistics;
}
export declare class i18UA implements Ii18n {
    settings: i18nSettingsUA;
    statistics: i18nStatisticsUA;
}
export declare class i18EN implements Ii18n {
    settings: i18nSettingsEN;
    statistics: i18nStatisticsEN;
}
export interface Ii18nSettings {
    operationsCount: string;
    operandDimention: string;
    allowedOperations: string;
    header: string;
    add: string;
    substract: string;
    multiply: string;
    divide: string;
}
export declare class i18nSettingsUA implements Ii18nSettings {
    operationsCount: string;
    operandDimention: string;
    allowedOperations: string;
    header: string;
    add: string;
    substract: string;
    multiply: string;
    divide: string;
}
export declare class i18nSettingsEN implements Ii18nSettings {
    operationsCount: string;
    operandDimention: string;
    allowedOperations: string;
    header: string;
    add: string;
    substract: string;
    multiply: string;
    divide: string;
}
export interface Ii18nStatistics {
    header: string;
    answersTotal: string;
    rightAnswers: string;
    rightAnswersFromFirstTry: string;
    rightAnswersFromSecondTry: string;
    rightAnswersFromThirdTry: string;
    wrongAnswers: string;
}
export declare class i18nStatisticsUA implements Ii18nStatistics {
    header: string;
    answersTotal: string;
    rightAnswers: string;
    rightAnswersFromFirstTry: string;
    rightAnswersFromSecondTry: string;
    rightAnswersFromThirdTry: string;
    wrongAnswers: string;
}
export declare class i18nStatisticsEN implements Ii18nStatistics {
    header: string;
    answersTotal: string;
    rightAnswers: string;
    rightAnswersFromFirstTry: string;
    rightAnswersFromSecondTry: string;
    rightAnswersFromThirdTry: string;
    wrongAnswers: string;
}

import { Ii18n } from "../i18n";
export declare class AppModel {
    settings: SettingsModel;
    statistics: StatisticsModel;
    equations: EquationsModel;
    i18n: Ii18n;
    changeLanguage(lang: string): void;
}
/// <reference types="knockout" />
export declare class EquationsModel {
    current: KnockoutObservable<string>;
    answer: KnockoutObservable<number>;
    givenAnswer: KnockoutObservable<number>;
    constructor();
}
/// <reference types="knockout" />

export declare class SettingsModel {
    allowedOperations: KnockoutObservableArray<string>;
    operationsCount: KnockoutObservable<number>;
    operandDimention: KnockoutObservable<number>;
    constructor(allowedOperations: Array<Operations>, operationsCount: number, operandDimention: number);
    private operationsTostring(operations);
}
/// <reference types="knockout" />
export declare class StatisticsModel {
    answersTotal: KnockoutObservable<number>;
    rightAnswersFromFirstTryCount: KnockoutObservable<number>;
    rightAnswersFromSecondTryCount: KnockoutObservable<number>;
    rightAnswersFromThirdTryCount: KnockoutObservable<number>;
    rightAnswersCount: KnockoutComputed<number>;
    wrongAnswersCount: KnockoutComputed<number>;
}

export declare class Equation {
    operands: Array<number>;
    operations: Array<Operations>;
    result: number;
}
export declare enum Operations {
    Add = 0,
    Substract = 1,
    Multiply = 2,
    Divide = 3,
}

import { Equation } from "../domain/Equation";
import { IRandomService } from "./RandomService";
export interface IEquationSettings {
    operationsCount?: number;
    allowedOperations?: Array<Operations>;
    operandDimension?: number;
}
export interface IEquationService {
    Create(settings?: IEquationSettings): any;
    EquationToString(equation: Equation): string;
}
export declare class EquationService implements IEquationService {
    private _randomService;
    constructor(_randomService: IRandomService);
    Create(settings: IEquationSettings): Equation;
    EquationToString(equation: Equation): string;
    private operationToString(operation);
    private adjustSettings(settings);
    private generateOperand2(operation, settings);
    private generateNumber(dimension, lower?);
    private adjustEquation(equation);
    private solve(equation);
}
export interface IRandomService {
    Randomize(lower: number, upper: number): number;
}
export declare class RandomService implements IRandomService {
    Randomize(lower: number, upper: number): number;
}
