import React, { useState, useEffect } from 'react';
import studentPhoto from './assets/images/student_profile_photo_1789393152817.jpg';
import headerImage from '../images/header.jpg'; 
import moneyIcon from './assets/images/icon/money_de.gif';
import infoIcon from './assets/images/icon/informat.gif';
import userIcon from './assets/images/icon/user_gra.gif';
import exitIcon from './assets/images/icon/applicb6.gif';
import expertAssessment from './assets/images/expert_assessment.jpg';
interface ExamTimeResult {
  code: string;
  name: string;
  term: string;
  date: string;
  time: string;
  center: string;
  seat: string;
}

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Local file-based database for student terms & courses
  const [terms, setTerms] = useState<any[]>([]);
  const [termsLoading, setTermsLoading] = useState(true);

  // Fallback initial course data
  const fallbackTerms = [
    {
      term: 'S25', year: '2025', countPE: 1,
      courses: [
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C9_S25', chr: '17.4', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'INT205', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private Criminal Law2', code: 'BL_CRI401_C5_S25', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '16', total: '16', code2: 'CRI401', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Criminal Procedure 1', code: 'BL_CRP605_C13_S25', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'CRP605', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Procedure 2', code: 'BL_CIP601_C10_S25', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'CIP601', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private International Law 2', code: 'BL_PIL701_C13_S25', chr: '19.4', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '20', total: '20', code2: 'PIL701', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Execution Procedures', code: 'BL_CIV702_C8_S25', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '16', total: '16', code2: 'CIV702', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Law 6', code: 'BL_CIV704_C4_S25', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'CIV704', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Juvenile Law', code: 'BL_JLE852_C6_S25', chr: '19', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '43.2', f: '63', total: '63', code2: 'JLE852', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Money Laundering Law', code: 'BL_MLE853_C4_S25', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'MLE853', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Cyber Crime', code: 'BL_CybcE854_C2_S25', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'CybcE854', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'S24', year: '2024', countPE: 2,
      courses: [
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C7_S24', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '26.8', f: '41', total: '41', code2: 'INT205', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private Criminal Law2', code: 'BL_CRI401_C18_S24', chr: '19', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '19', total: '19', code2: 'CRI401', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Criminal Procedure 1', code: 'BL_CRP605_C6_S24', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'CRP605', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Procedure 2', code: 'BL_CIP601_C9_S24', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28', f: '44', total: '44', code2: 'CIP601', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private International Law 2', code: 'BL_PIL701_C3_S24', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '16', total: '16', code2: 'PIL701', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Execution Procedures', code: 'BL_CIV702_C7_S24', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '13', total: '13', code2: 'CIV702', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Law 6', code: 'BL_CIV704_C6_S24', chr: '15', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '15', total: '15', code2: 'CIV704', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Drugs law', code: 'BL_DLE851_C5_S24', chr: '13.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '49.6', f: '64', total: '64', code2: 'DLE851', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Juvenile Law', code: 'BL_JLE852_C5_S24', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '16', total: '16', code2: 'JLE852', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Money Laundering Law', code: 'BL_MLE853_C5_S24', chr: '16.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '17', total: '17', code2: 'MLE853', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Cyber Crime', code: 'BL_CybcE854_C4_S24', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '16', total: '16', code2: 'CybcE854', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Commercial Arbitration', code: 'BL_B706_C7_S24', chr: '18.8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '40', f: '59', total: '59', code2: 'B706', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: 'Helped' }
      ]
    },
    {
      term: 'F23', year: '2023', countPE: 4,
      courses: [
        { status: 'R', fa: 'F', title: 'Private Criminal Law2', code: 'BL_CRI401_C27_F23', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28', f: '44', total: '44', code2: 'CRI401', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Criminal Procedure 1', code: 'BL_CRP605_C16_F23', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '22.4', f: '37', total: '37', code2: 'CRP605', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Criminal Procedure 2', code: 'BL_CRP705_C2_F23', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '47.2', f: '65', total: '65', code2: 'CRP705', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Civil Law 5', code: 'BL_CIV604_C6_F23', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '52', total: '52', code2: 'CIV604', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Public International Law- English 3', code: 'BL_INT603_C14_F23', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '33.6', f: '51', total: '51', code2: 'INT603', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Procedure 2', code: 'BL_CIP601_C7_F23', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '32.8', f: '47', total: '47', code2: 'CIP601', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private International Law 2', code: 'BL_PIL701_C14_F23', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '22.4', f: '40', total: '40', code2: 'PIL701', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Tax Law', code: 'BL_TAX801_C16_F23', chr: '19.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '55', total: '55', code2: 'TAX801', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'S23', year: '2023', countPE: 5,
      courses: [
        { status: 'R', fa: 'P', title: 'English 2 -Criminal Law', code: 'BL_CL404_C13_S23', chr: '17.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '33.6', f: '52', total: '52', code2: 'CL404', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Civil Law 4', code: 'BL_Civ504_C8_S23', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '48', f: '61', total: '61', code2: 'Civ504', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Civil Procedure 1', code: 'BL_CIP501_C13_S23', chr: '12', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '37.6', f: '50', total: '50', code2: 'CIP501', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Personal Status Law 2', code: 'BL_FAM505_C15_S23', chr: '12', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '38.4', f: '51', total: '51', code2: 'FAM505', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Criminal Procedure 1', code: 'BL_CRP605_C15_S23', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '20.8', f: '38', total: '38', code2: 'CRP605', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private International Law 2', code: 'BL_PIL701_C11_S23', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '14.4', f: '32', total: '32', code2: 'PIL701', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'English 4 -International Trade Law', code: 'BL_ICL703_C6_S23', chr: '16.8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '30.4', f: '48', total: '48', code2: 'ICL703', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: 'Helped' },
        { status: 'R', fa: 'F', title: 'Tax Law', code: 'BL_TAX801_C12_S23', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28.8', f: '46', total: '46', code2: 'TAX801', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'F22', year: '2022', countPE: 3,
      courses: [
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C37_F22', chr: '14.4', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '26', f: '41', total: '41', code2: 'INT205', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Private Criminal Law 1', code: 'BL_CRI301_C9_F22', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '39.2', f: '54', total: '54', code2: 'CRI301', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private Criminal Law2', code: 'BL_CRI401_C18_F22', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '26.4', f: '40', total: '40', code2: 'CRI401', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Procedure 1', code: 'BL_CIP501_C9_F22', chr: '8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '32.8', f: '41', total: '41', code2: 'CIP501', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Commercial Law 3 (Commercial Papers)', code: 'BL_CL503_C14_F22', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '36.8', f: '51', total: '51', code2: 'CL503', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Commercial Law 4 (Maritime and Air Law)', code: 'BL_ML606_C4_F22', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '41.6', f: '56', total: '56', code2: 'ML606', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private International Law 2', code: 'BL_PIL701_C12_F22', chr: '17.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '18', total: '18', code2: 'PIL701', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Tax Law', code: 'BL_TAX801_C4_F22', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28.8', f: '43', total: '43', code2: 'TAX801', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'S22', year: '2022', countPE: 1,
      courses: [
        { status: 'R', fa: 'F', title: 'Private Criminal Law 1', code: 'BL_CRI301_C20_S22', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '26.4', f: '41', total: '41', code2: 'CRI301', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private Criminal Law2', code: 'BL_CRI401_C2_S22', chr: '9', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '14.4', f: '24', total: '24', code2: 'CRI401', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Procedure 1', code: 'BL_CIP501_C9_S22', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '25.6', f: '39', total: '39', code2: 'CIP501', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Commercial Law 3 (Commercial Papers)', code: 'BL_CL503_C11_S22', chr: '19', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '27.2', f: '47', total: '47', code2: 'CL503', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Personal Status Law 2', code: 'BL_FAM505_C9_S22', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '29.6', f: '47', total: '47', code2: 'FAM505', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private International Law 2', code: 'BL_PIL701_C4_S22', chr: '14.2', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28.8', f: '43', total: '43', code2: 'PIL701', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Tax Law', code: 'BL_TAX801_C7_S22', chr: '12', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '25.6', f: '38', total: '38', code2: 'TAX801', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Islamic Doctrine', code: 'BL_ID803_C7_S22', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '30.4', f: '48', total: '48', code2: 'ID803', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: 'Helped' }
      ]
    },
    {
      term: 'F21', year: '2021', countPE: 3,
      courses: [
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C28_F21', chr: '17', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '20.8', f: '38', total: '38', code2: 'INT205', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Private Criminal Law 1', code: 'BL_CRI301_C15_F21', chr: '14.8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '27.2', f: '42', total: '42', code2: 'CRI301', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Commercial Law 2 (Company Law)', code: 'BL_COM402_C9_F21', chr: '15', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '41.6', f: '57', total: '57', code2: 'COM402', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Civil Procedure 1', code: 'BL_CIP501_C7_F21', chr: '11', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '23.2', f: '35', total: '35', code2: 'CIP501', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Administrative Law 3', code: 'BL_ADM506_C4_F21', chr: '12', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '38.4', f: '51', total: '51', code2: 'ADM506', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Private International Law 1', code: 'BL_PIL602_C7_F21', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '46.4', f: '61', total: '61', code2: 'PIL602', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Tax Law', code: 'BL_TAX801_C6_F21', chr: '13.2', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '19.2', f: '33', total: '33', code2: 'TAX801', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Islamic Doctrine', code: 'BL_ID803_C7_F21', chr: '14.4', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '19.2', f: '34', total: '34', code2: 'ID803', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'S21', year: '2021', countPE: 7,
      courses: [
        { status: 'R', fa: 'P', title: 'Human Rights', code: 'BL_HUM201_C15_S21', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '49.6', f: '68', total: '68', code2: 'HUM201', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Public Criminal Law 2', code: 'BL_CRI202_C19_S21', chr: '14.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '38.4', f: '53', total: '53', code2: 'CRI202', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C21_S21', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '30.4', f: '44', total: '44', code2: 'INT205', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Civil Law 3', code: 'BL_CIV405_C6_S21', chr: '16.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '38.4', f: '55', total: '55', code2: 'CIV405', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Commercial Law 1', code: 'BL_COM302_C8_S21', chr: '19.8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '55', total: '55', code2: 'COM302', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Cooperative Law', code: 'BL_COL403_C9_S21', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '38.4', f: '55', total: '55', code2: 'COL403', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Administrative Law 2', code: 'BL_ADM406_C2_S21', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '44.8', f: '61', total: '61', code2: 'ADM406', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Public Finance Law', code: 'BL_FL502_C15_S21', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '33.6', f: '50', total: '50', code2: 'FL502', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'F20', year: '2020', countPE: 3,
      courses: [
        { status: 'R', fa: 'F', title: 'Human Rights', code: 'BL_HUM201_C7_F20', chr: '12', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '12', total: '12', code2: 'HUM201', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Public Criminal Law 2', code: 'BL_CRI202_C6_F20', chr: '10', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '27.2', f: '38', total: '38', code2: 'CRI202', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Commercial Law 1', code: 'BL_COM302_C11_F20', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '22.4', f: '36', total: '36', code2: 'COM302', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Administrative Law 1', code: 'BL_ADM303_C3_F20', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '40', f: '53', total: '53', code2: 'ADM303', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Cooperative Law', code: 'BL_COL403_C11_F20', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '33.6', f: '47', total: '47', code2: 'COL403', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'F', title: 'Personal Status Law 2', code: 'BL_FAM505_C2_F20', chr: '15', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '12.8', f: '28', total: '28', code2: 'FAM505', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Labor Law', code: 'BL_LL802_C3_F20', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '43.2', f: '60', total: '60', code2: 'LL802', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' },
        { status: 'R', fa: 'P', title: 'Civil Law 2', code: 'BL_CIV306_C3_F20', chr: '15', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '37.6', f: '53', total: '53', code2: 'CIV306', extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'], helped: '' }
      ]
    },
    {
      term: 'S20', year: '2020', countPE: 3,
      courses: [
        { status: 'R', fa: 'P', title: 'Introduction to Political Science', code: 'BL_POL204_C13_S20', chr: '16.2', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '52', total: '52', code2: 'POL204', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'Human Rights', code: 'BL_HUM201_C5_S20', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28.8', f: '45', total: '45', code2: 'HUM201', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'Public Criminal Law 2', code: 'BL_CRI202_C14_S20', chr: '9.4', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '27.2', f: '37', total: '37', code2: 'CRI202', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C14_S20', chr: '17.8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '20.8', f: '39', total: '39', code2: 'INT205', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'Commercial Law 1', code: 'BL_COM302_C8_S20', chr: '16.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '30.4', f: '47', total: '47', code2: 'COM302', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'Administrative Law 1', code: 'BL_ADM303_C8_S20', chr: '15', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28.8', f: '44', total: '44', code2: 'ADM303', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Personal Status Law 1', code: 'BL_FAM304_C7_S20', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '52', total: '52', code2: 'FAM304', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'International Economic Law', code: 'BL_EIL305_C8_S20', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '57.6', f: '72', total: '72', code2: 'EIL305', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" }
      ]
    },
    {
      term: 'F19', year: '2019', countPE: 3,
      courses: [
        { status: 'R', fa: 'F', title: 'Introduction to Political Science', code: 'BL_POL204_C11_F19', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '22.4', f: '39', total: '39', code2: 'POL204', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Principles of Economics', code: 'BL_ECO103_C12_F19', chr: '12.8', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '48', total: '48', code2: 'ECO103', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "Helped" },
        { status: 'R', fa: 'P', title: 'Constitutional Law and Political Systems', code: 'BL_CON104_C18_F19', chr: '13', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '40', f: '53', total: '53', code2: 'CON104', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'Public Criminal Law 2', code: 'BL_CRI202_C9_F19', chr: '10', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '28.8', f: '39', total: '39', code2: 'CRI202', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Civil Law 1', code: 'BL_CIV206_C14_F19', chr: '16', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '33.6', f: '50', total: '50', code2: 'CIV206', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C11_F19', chr: '13.6', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '32', f: '46', total: '46', code2: 'INT205', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" }
      ]
    },
    {
      term: 'S19', year: '2019', countPE: 3,
      courses: [
        { status: 'R', fa: 'F', title: 'Public Criminal Law 2', code: 'BL_CRI202_C7_S19', chr: '12', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '32', f: '44', total: '44', code2: 'CRI202', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Principles of Islamic Sharia', code: 'BL_IS203_C8_S19', chr: '19', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '36.8', f: '56', total: '56', code2: 'IS203', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Public International Law', code: 'BL_INL102_C12_S19', chr: '15', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '35.2', f: '51', total: '51', code2: 'INL102', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'Civil Law 1', code: 'BL_CIV206_C5_S19', chr: '13.2', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '25.6', f: '39', total: '39', code2: 'CIV206', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'F', title: 'English 1 -Introduction to Law and Legal Systems', code: 'BL_INT205_C13_S19', chr: '0', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '0', total: '0', code2: 'INT205', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Legal Methodology', code: 'BL_MET105_C4_S19', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '41.6', f: '56', total: '56', code2: 'MET105', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" }
      ]
    },
    {
      term: 'F18', year: '2018', countPE: 4,
      courses: [
        { status: 'R', fa: 'P', title: 'Introduction to Law', code: 'BL_IL106_C8_F18', chr: '18', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '33.6', f: '52', total: '52', code2: 'IL106', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Public Criminal Law1', code: 'BL_CRI101_C6_F18', chr: '14', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '41.6', f: '56', total: '56', code2: 'CRI101', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'Computer Skills', code: 'BL_CDL107_C15_F18', chr: '19.4', e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '41.6', f: '61', total: '61', code2: 'CDL107', extra: ["1", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" },
        { status: 'R', fa: 'P', title: 'E-learning', code: 'BL_GBS108_C17_F18', chr: '13.6', e1: "0", e2: "20", e3: "0", m: "0", o: "0", p: "59.33", f: "73", total: "73", code2: "GBS108", extra: ["0", "20", "0", "0", "0", "0", "0", "80", "100"], helped: "" }
      ]
    }
  ];

  // Fetch student course terms from file database
  useEffect(() => {
    fetch('/api/terms')
      .then(res => {
        if (!res.ok) throw new Error('Database read failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTerms(data);
        } else {
          setTerms(fallbackTerms);
        }
        setTermsLoading(false);
      })
      .catch(err => {
        console.warn('Backend local DB failed or not running. Falling back:', err);
        setTerms(fallbackTerms);
        setTermsLoading(false);
      });
  }, []);

  // Save changes to database
  const saveTermsToDb = (updatedTerms: any[]) => {
    setTerms(updatedTerms);
    fetch('/api/terms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTerms)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log('Database file updated successfully');
      } else {
        console.error('Failed to update database file:', data.error);
      }
    })
    .catch(err => {
      console.error('Error saving database to file:', err);
    });
  };

  // State for editing or adding courses (Admin only)
  const [editingCourse, setEditingCourse] = useState<{ termIdx: number; courseIdx: number; data: any } | null>(null);
  const [addingCourseToTermIdx, setAddingCourseToTermIdx] = useState<number | null>(null);
  const [editingTermBlock, setEditingTermBlock] = useState<{ termIdx: number; term: string; year: string; countPE: number } | null>(null);
  
  // Tab state: default to 'profileP' on login
  type TabType = 'profileP' | 'profileS' | 'average' | 'classes' | 'exams' | 'payments' | 'timeSearch' | 'oldReg' | 'placement' | 'military' | 'naqaba' | 'changePass' | 'updateReg' | 'chooseSpec' | 'calendar' | 'lectureTutor';
  const [activeTab, setActiveTab] = useState<TabType>('profileP');
  
  // Left panel UI states
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(true);
  const [studentAreaOpen, setStudentAreaOpen] = useState(true);
  const [classLecturesOpen, setClassLecturesOpen] = useState(true);
  const [examAreaOpen, setExamAreaOpen] = useState(true);
  const [studentProfileSubOpen, setStudentProfileSubOpen] = useState(true);

  // Modal for photo preview
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // Lecture & Tutor time states
  const [selectedLtTerm, setSelectedLtTerm] = useState<string>("49");
  const [selectedLtProgram, setSelectedLtProgram] = useState<string>("-1");
  const [selectedLtCourse, setSelectedLtCourse] = useState<string>("-1");
  const [selectedLtDay, setSelectedLtDay] = useState<string>("-1");
  const [selectedLtTutor, setSelectedLtTutor] = useState<string>("-1");

  const programsList = [
    { id: "15", name: "(MBA) | (Master in Business Administration)" },
    { id: "19", name: "MBA | Master in Business Administration" },
    { id: "31", name: "ACM | ACM Traning program" },
    { id: "77", name: "Afaq | Afaq uninersity" },
    { id: "86", name: "Afaq_m | Master of afaq" },
    { id: "30", name: "AFL | Arabic as a Foreign Language" },
    { id: "4", name: "AHND | Arabic Higher National Diploma in Computing and Business Applications" },
    { id: "44", name: "ALS | Arabic Learning System" },
    { id: "34", name: "ATP | Admission Tests" },
    { id: "33", name: "BACT | Bachelor in Communications Technology" },
    { id: "32", name: "BAIT | Bachelor in Information Technology" },
    { id: "25", name: "BBA | Bachelor in Business Administration" },
    { id: "65", name: "BECT | Bachelor of Education (Class teacher)" },
    { id: "68", name: "BIMM | Master in Building Information Modeling and Management" },
    { id: "69", name: "BIS | Master in Bioinformatics" },
    { id: "8", name: "BIT | Bachelor in Information Technology" },
    { id: "26", name: "BIT_Bridging | BIT Bridging" },
    { id: "21", name: "BL | Bachelor of Law" },
    { id: "76", name: "BL_R | Bachelor of Law Not accepted" },
    { id: "27", name: "BMC | Bachelor in Mass Communication" },
    { id: "11", name: "BRIDG | Bridging to UoG" },
    { id: "14", name: "BSCE | Bachelor in Economics" },
    { id: "58", name: "BSCM | Bachelor in Economics Management" },
    { id: "71", name: "BTHM | Bacholur of Tourism Hospitality Management" },
    { id: "60", name: "DAC | Digital Arabic Content" },
    { id: "81", name: "DL | Diplomatic Institute" },
    { id: "28", name: "DP | Doctoral Program" },
    { id: "3", name: "EDU | Grduate Diploma in Education" },
    { id: "42", name: "EDUC | Graduate Diploma in Education" },
    { id: "6", name: "EHND | English Higher National Diploma in Computing and Business Applications" },
    { id: "7", name: "ENG | English program" },
    { id: "29", name: "Exam | Exam" },
    { id: "22", name: "FDOCT | FormaDoct" },
    { id: "91", name: "HBIM | Master of Historical Building Information Modeling" },
    { id: "88", name: "HRM | Human Resources Management" },
    { id: "39", name: "ICDLTP | ICDLTraining Program" },
    { id: "47", name: "IMNR | Integrated Management of Natural Resources" },
    { id: "2", name: "ISE | Bachelor in Information System Engineering" },
    { id: "53", name: "ITE | Information Technology Engineering" },
    { id: "57", name: "KPT | Kids Programming Training" },
    { id: "73", name: "LFLBIMM | Building Information Modeling and Management" },
    { id: "45", name: "LFLDmail | DMAIL Training Program" },
    { id: "46", name: "LFLEmployees | Employees Training Program" },
    { id: "63", name: "LFLTOT | Training of Trainers" },
    { id: "55", name: "LFL_ALS | Arabic Learning System" },
    { id: "56", name: "LFL_ELL | English Language Learning " },
    { id: "66", name: "LFL_PMP | Project Management Professional" },
    { id: "51", name: "LFL_RUSS | Learning Russian" },
    { id: "70", name: "MAL | Master in Applied Linguistics" },
    { id: "79", name: "MCS | Master In Computer Science" },
    { id: "67", name: "MDA | Master of Qualification and Specialty of the Administrative Development" },
    { id: "87", name: "MDT | Master in Digital Transformation Management" },
    { id: "50", name: "MedE | Master in Medical Education" },
    { id: "54", name: "MedE_R | Master in Medical Education R" },
    { id: "83", name: "MHA | Master of Health Administration Program" },
    { id: "49", name: "MIHL | Master in International Humanitarian Law" },
    { id: "35", name: "MiQ | Master in Quality Programme" },
    { id: "41", name: "MITE | Master: Integration of technology in education" },
    { id: "64", name: "MMA | ministray of development" },
    { id: "43", name: "MNE | Medical National Exam" },
    { id: "84", name: "MNGO | Master of Management of non-governmental organizations" },
    { id: "78", name: "MNT | Master In Networking Technology" },
    { id: "18", name: "MQM | Master in Quality Management" },
    { id: "89", name: "MSAI | Master in Web Science and Artificial Intelligence" },
    { id: "17", name: "MTM | Master in Technology Management-" },
    { id: "23", name: "MWS | Master in Web Sciences" },
    { id: "20", name: "MWT | Master in Web Technologies" },
    { id: "40", name: "NEP | National Exam Program" },
    { id: "48", name: "NIST | Networking and Information Security Training Program" },
    { id: "36", name: "PMTM | Master in Technology Management" },
    { id: "5", name: "PY | Preparatory Year" },
    { id: "90", name: "SCES | Bachelor of Smart Cities Engineering and Sustainability" },
    { id: "59", name: "TIBA | Technical Institute for Business Administration" },
    { id: "80", name: "tiba_r | Tiba NOT accepted" },
    { id: "37", name: "TIC | Technology Institute for Computer" },
    { id: "85", name: "TIEMD | Technical Institute for Engineering Management and Digitizing" },
    { id: "75", name: "TITH | Technical Institute for Tourism and Hotel Sciences" },
    { id: "74", name: "TPCOFC | Training program for the inspectors of the Central Agency for financial supervision" },
    { id: "61", name: "TRE | Training courses for employees" },
    { id: "38", name: "TRI | Training Program" },
    { id: "16", name: "UOG | University Of Greenwich" }
  ];

  const mockLectureSchedules = [
    // MBA Courses (Programs 15 & 19)
    { programId: "15", courseId: "AO101", courseCode: "AO101", courseName: "Administration of Operation", className: "C1", tutorId: "t_mba1", tutorName: "Dr. Bassam Homsi", dayId: "2", dayName: "Sunday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 1" },
    { programId: "15", courseId: "FM102", courseCode: "FM102", courseName: "Financial Management", className: "C1", tutorId: "t_mba2", tutorName: "Dr. Tareq Al-Ahmad", dayId: "3", dayName: "Monday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 2" },
    { programId: "15", courseId: "SA103", courseCode: "SA103", courseName: "Strategic Administration", className: "C2", tutorId: "t_mba3", tutorName: "Dr. Maher Kabakibi", dayId: "4", dayName: "Tuesday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 3" },
    { programId: "15", courseId: "LTMM104", courseCode: "LTMM104", courseName: "Local & International Marketing Management", className: "C1", tutorId: "t_mba4", tutorName: "Dr. Rasha Al-Khani", dayId: "5", dayName: "Wednesday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 4" },
    { programId: "15", courseId: "IBA105", courseCode: "IBA105", courseName: "International Business Administration", className: "C1", tutorId: "t_mba1", tutorName: "Dr. Bassam Homsi", dayId: "6", dayName: "Thursday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 1" },
    { programId: "15", courseId: "ATMO106", courseCode: "ATMO106", courseName: "Advanced Topics In Managing Organizations", className: "C1", tutorId: "t_mba2", tutorName: "Dr. Tareq Al-Ahmad", dayId: "1", dayName: "Saturday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 2" },
    { programId: "15", courseId: "HRM107", courseCode: "HRM107", courseName: "Human Resources Management", className: "C2", tutorId: "t_mba4", tutorName: "Dr. Rasha Al-Khani", dayId: "2", dayName: "Sunday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 3" },
    { programId: "15", courseId: "THE", courseCode: "THE", courseName: "MBA THESIS", className: "C1", tutorId: "t_mba3", tutorName: "Dr. Maher Kabakibi", dayId: "3", dayName: "Monday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 4" },
    { programId: "15", courseId: "test15", courseCode: "test15", courseName: "test15", className: "C1", tutorId: "t_mba1", tutorName: "Dr. Bassam Homsi", dayId: "4", dayName: "Tuesday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 1" },
    { programId: "15", courseId: "Test16", courseCode: "Test16", courseName: "Test16", className: "C1", tutorId: "t_mba2", tutorName: "Dr. Tareq Al-Ahmad", dayId: "5", dayName: "Wednesday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 2" },
    { programId: "15", courseId: "test22", courseCode: "test22", courseName: "ttttest", className: "C1", tutorId: "t_mba4", tutorName: "Dr. Rasha Al-Khani", dayId: "6", dayName: "Thursday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 3" },
    { programId: "15", courseId: "testqqq", courseCode: "testqqq", courseName: "testqq", className: "C1", tutorId: "t_mba3", tutorName: "Dr. Maher Kabakibi", dayId: "1", dayName: "Saturday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 4" },
    { programId: "15", courseId: "testfinal", courseCode: "testfinal", courseName: "final", className: "C1", tutorId: "t_mba1", tutorName: "Dr. Bassam Homsi", dayId: "2", dayName: "Sunday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 1" },

    { programId: "19", courseId: "AO101", courseCode: "AO101", courseName: "Administration of Operation", className: "C1", tutorId: "t_mba1", tutorName: "Dr. Bassam Homsi", dayId: "2", dayName: "Sunday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 1" },
    { programId: "19", courseId: "FM102", courseCode: "FM102", courseName: "Financial Management", className: "C1", tutorId: "t_mba2", tutorName: "Dr. Tareq Al-Ahmad", dayId: "3", dayName: "Monday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 2" },
    { programId: "19", courseId: "SA103", courseCode: "SA103", courseName: "Strategic Administration", className: "C2", tutorId: "t_mba3", tutorName: "Dr. Maher Kabakibi", dayId: "4", dayName: "Tuesday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 3" },
    { programId: "19", courseId: "LTMM104", courseCode: "LTMM104", courseName: "Local & International Marketing Management", className: "C1", tutorId: "t_mba4", tutorName: "Dr. Rasha Al-Khani", dayId: "5", dayName: "Wednesday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 4" },
    { programId: "19", courseId: "IBA105", courseCode: "IBA105", courseName: "International Business Administration", className: "C1", tutorId: "t_mba1", tutorName: "Dr. Bassam Homsi", dayId: "6", dayName: "Thursday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 1" },
    { programId: "19", courseId: "ATMO106", courseCode: "ATMO106", courseName: "Advanced Topics In Managing Organizations", className: "C1", tutorId: "t_mba2", tutorName: "Dr. Tareq Al-Ahmad", dayId: "1", dayName: "Saturday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 2" },
    { programId: "19", courseId: "HRM107", courseCode: "HRM107", courseName: "Human Resources Management", className: "C2", tutorId: "t_mba4", tutorName: "Dr. Rasha Al-Khani", dayId: "2", dayName: "Sunday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 3" },
    { programId: "19", courseId: "THE", courseCode: "THE", courseName: "MBA THESIS", className: "C1", tutorId: "t_mba3", tutorName: "Dr. Maher Kabakibi", dayId: "3", dayName: "Monday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 4" },

    // BL (Program 21)
    { programId: "21", courseId: "BL_INT205", courseCode: "BL_INT205", courseName: "English 1 -Introduction to Law and Legal Systems", className: "C1", tutorId: "t1", tutorName: "Dr. Nour Ibrahim", dayId: "2", dayName: "Sunday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 1" },
    { programId: "21", courseId: "BL_CRI401", courseCode: "BL_CRI401", courseName: "Private Criminal Law 2", className: "C2", tutorId: "t2", tutorName: "Dr. Fadi Shaaban", dayId: "3", dayName: "Monday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 3" },
    { programId: "21", courseId: "BL_CRP605", courseCode: "BL_CRP605", courseName: "Criminal Procedure 1", className: "C1", tutorId: "t3", tutorName: "Dr. Ghiath Al-Kahlout", dayId: "4", dayName: "Tuesday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 2" },
    { programId: "21", courseId: "BL_CIP601", courseCode: "BL_CIP601", courseName: "Civil Procedure 2", className: "C3", tutorId: "t4", tutorName: "Dr. Rana Al-Kadi", dayId: "5", dayName: "Wednesday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 4" },
    { programId: "21", courseId: "BL_PIL701", courseCode: "BL_PIL701", courseName: "Private International Law 2", className: "C1", tutorId: "t5", tutorName: "Dr. Reem Solaiman", dayId: "6", dayName: "Thursday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 1" },
    { programId: "21", courseId: "BL_CIV702", courseCode: "BL_CIV702", courseName: "Execution Procedures", className: "C1", tutorId: "t2", tutorName: "Dr. Fadi Shaaban", dayId: "1", dayName: "Saturday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 2" },
    { programId: "21", courseId: "BL_CIV704", courseCode: "BL_CIV704", courseName: "Civil Law 6", className: "C2", tutorId: "t4", tutorName: "Dr. Rana Al-Kadi", dayId: "2", dayName: "Sunday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 3" },
    { programId: "21", courseId: "BL_JLE852", courseCode: "BL_JLE852", courseName: "Juvenile Law", className: "C1", tutorId: "t1", tutorName: "Dr. Nour Ibrahim", dayId: "3", dayName: "Monday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 4" },
    { programId: "21", courseId: "BL_MLE853", courseCode: "BL_MLE853", courseName: "Money Laundering Law", className: "C1", tutorId: "t3", tutorName: "Dr. Ghiath Al-Kahlout", dayId: "4", dayName: "Tuesday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 1" },
    { programId: "21", courseId: "BL_CybcE854", courseCode: "BL_CybcE854", courseName: "Cyber Crime", className: "C1", tutorId: "t5", tutorName: "Dr. Reem Solaiman", dayId: "5", dayName: "Wednesday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 2" },
    
    // BIT / BAIT (Programs 8 & 32)
    { programId: "8", courseId: "BIT_INT101", courseCode: "BIT_INT101", courseName: "Introduction to IT", className: "C1", tutorId: "t6", tutorName: "Dr. Mohammad Ahmad", dayId: "1", dayName: "Saturday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 5" },
    { programId: "8", courseId: "BIT_PRG102", courseCode: "BIT_PRG102", courseName: "Programming 1", className: "C2", tutorId: "t7", tutorName: "Dr. Samer Hassan", dayId: "2", dayName: "Sunday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 3" },
    { programId: "8", courseId: "BIT_PRG201", courseCode: "BIT_PRG201", courseName: "Object Oriented Programming", className: "C1", tutorId: "t7", tutorName: "Dr. Samer Hassan", dayId: "3", dayName: "Monday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 2" },
    { programId: "8", courseId: "BIT_WEB202", courseCode: "BIT_WEB202", courseName: "Web Technologies 1", className: "C1", tutorId: "t6", tutorName: "Dr. Mohammad Ahmad", dayId: "4", dayName: "Tuesday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 1" },
    { programId: "8", courseId: "BIT_SEC301", courseCode: "BIT_SEC301", courseName: "Information Security", className: "C2", tutorId: "t7", tutorName: "Dr. Samer Hassan", dayId: "5", dayName: "Wednesday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 4" },
    { programId: "32", courseId: "BIT_INT101", courseCode: "BIT_INT101", courseName: "Introduction to IT", className: "C1", tutorId: "t6", tutorName: "Dr. Mohammad Ahmad", dayId: "1", dayName: "Saturday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 5" },
    { programId: "32", courseId: "BIT_PRG102", courseCode: "BIT_PRG102", courseName: "Programming 1", className: "C2", tutorId: "t7", tutorName: "Dr. Samer Hassan", dayId: "2", dayName: "Sunday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 3" },

    // BSCE (Program 14)
    { programId: "14", courseId: "ECO101", courseCode: "ECO101", courseName: "Principles of Microeconomics", className: "C1", tutorId: "t4", tutorName: "Dr. Rana Al-Kadi", dayId: "1", dayName: "Saturday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 2" },
    { programId: "14", courseId: "BSCE_MGT201", courseCode: "BSCE_MGT201", courseName: "Principles of Management", className: "C2", tutorId: "t1", tutorName: "Dr. Nour Ibrahim", dayId: "5", dayName: "Wednesday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 3" },

    // ISE (Program 2)
    { programId: "2", courseId: "ISE_PRG101", courseCode: "ISE_PRG101", courseName: "Structured Programming", className: "C3", tutorId: "t7", tutorName: "Dr. Samer Hassan", dayId: "6", dayName: "Thursday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 5" },
    { programId: "2", courseId: "ISE_NET303", courseCode: "ISE_NET303", courseName: "Computer Networks", className: "C1", tutorId: "t6", tutorName: "Dr. Mohammad Ahmad", dayId: "3", dayName: "Monday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 1" },

    // MWT & MWS (Programs 20 & 23)
    { programId: "20", courseId: "MWT_WEB501", courseCode: "MWT_WEB501", courseName: "Advanced Web Programming", className: "C1", tutorId: "t6", tutorName: "Dr. Mohammad Ahmad", dayId: "1", dayName: "Saturday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 4" },
    { programId: "20", courseId: "MWT_SOA502", courseCode: "MWT_SOA502", courseName: "Service-Oriented Architectures", className: "C1", tutorId: "t7", tutorName: "Dr. Samer Hassan", dayId: "3", dayName: "Monday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 2" },
    { programId: "23", courseId: "MWS_AI501", courseCode: "MWS_AI501", courseName: "Artificial Intelligence & Web", className: "C1", tutorId: "t6", tutorName: "Dr. Mohammad Ahmad", dayId: "2", dayName: "Sunday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 1" }
  ];

  // Helper to dynamically obtain schedules for any program
  const getSchedulesForProgram = (progId: string) => {
    const directMatches = mockLectureSchedules.filter(item => item.programId === progId);
    if (directMatches.length > 0) return directMatches;

    const progInfo = programsList.find(p => p.id === progId);
    if (!progInfo) return [];

    const prefix = progInfo.name.split('|')[0].trim().replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase() || "PROG";
    return [
      { programId: progId, courseId: `${prefix}_101`, courseCode: `${prefix}_101`, courseName: `${prefix} Introduction Course 1`, className: "C1", tutorId: "t_gen1", tutorName: "Dr. Ahmad Al-Ali", dayId: "1", dayName: "Saturday", time: "06:00 PM - 08:00 PM", room: "Virtual Room 1" },
      { programId: progId, courseId: `${prefix}_102`, courseCode: `${prefix}_102`, courseName: `${prefix} Applied Core Module 2`, className: "C1", tutorId: "t_gen2", tutorName: "Dr. Majd Kabbani", dayId: "3", dayName: "Monday", time: "08:00 PM - 10:00 PM", room: "Virtual Room 2" },
      { programId: progId, courseId: `${prefix}_201`, courseCode: `${prefix}_201`, courseName: `${prefix} Advanced Specialization 3`, className: "C2", tutorId: "t_gen3", tutorName: "Dr. Lina Mansour", dayId: "5", dayName: "Wednesday", time: "04:00 PM - 06:00 PM", room: "Virtual Room 3" }
    ];
  };

  const activeProgramSchedules = selectedLtProgram === "-1" ? [] : getSchedulesForProgram(selectedLtProgram);

  const availableLtCourses = selectedLtProgram === "-1"
    ? []
    : Array.from(
        new Map(
          activeProgramSchedules
            .map(item => [item.courseId, { id: item.courseId, code: item.courseCode, name: item.courseName }])
        ).values()
      );

  const availableLtTutors = Array.from(
    new Map(
      activeProgramSchedules
        .filter(item => {
          if (selectedLtCourse !== "-1" && item.courseId !== selectedLtCourse) return false;
          if (selectedLtDay !== "-1" && item.dayId !== selectedLtDay) return false;
          return true;
        })
        .map(item => [item.tutorId, { id: item.tutorId, name: item.tutorName }])
    ).values()
  );

  const filteredLtSchedules = activeProgramSchedules.filter(item => {
    if (selectedLtCourse !== "-1" && item.courseId !== selectedLtCourse) return false;
    if (selectedLtDay !== "-1" && item.dayId !== selectedLtDay) return false;
    if (selectedLtTutor !== "-1" && item.tutorId !== selectedLtTutor) return false;
    return true;
  });

  // Student ID Time Search state
  const [studentIdInput, setStudentIdInput] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState<ExamTimeResult[] | null>(null);

  const mockExamSchedule: ExamTimeResult[] = [
    {
      code: 'WEB',
      name: 'تقانات الويب والتطبيقات (Web Technologies)',
      term: 'S25',
      date: '2026-10-18',
      time: '12:30 PM - 02:30 PM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 1 / Desk 08'
    },
    {
      code: 'SEC',
      name: 'أمن المعلومات والشبكات (Information Security)',
      term: 'S25',
      date: '2026-10-15',
      time: '10:00 AM - 12:00 PM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 3 / Desk 14'
    },
    {
      code: 'OPS',
      name: 'نظم التشغيل (Operating Systems)',
      term: 'F24',
      date: '2025-03-20',
      time: '01:00 PM - 03:00 PM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 2 / Desk 05'
    },
    {
      code: 'DBS',
      name: 'نظم قواعد البيانات (Database Systems)',
      term: 'F23',
      date: '2024-03-15',
      time: '09:00 AM - 11:00 AM',
      center: 'مركز المزة - دمشق (Mezzeh Telecenter)',
      seat: 'Lab 1 / Desk 02'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Strict authentication rule
    const normalizedUser = username.trim();
    if (normalizedUser === 'haydaraa_116823' && password === '06200083193') {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setErrorMessage('');
      setActiveTab('profileP'); // Show Personal Profile std_profileP.php immediately on login
    } else if (normalizedUser === 'admin' && password === '123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setErrorMessage('');
      setActiveTab('profileS'); // Direct admin immediately to Studies Profile std_profileS.php
    } else {
      setErrorMessage('الاسم أو كلمة المرور غير صحيحة (Invalid username or password)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername('');
    setPassword('');
    setUserOtp('');
    setErrorMessage('');
  };

  const handleGetTime = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    
    if (!studentIdInput.trim()) {
      setSearchError('يرجى إدخال الرقم الجامعي للطالب (Please enter Student ID)');
      setSearchResults(null);
      return;
    }

    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
      if (studentIdInput.trim() === '116823' || studentIdInput.trim() === '116823_1' || studentIdInput.trim().length >= 4) {
        setSearchResults(mockExamSchedule);
        setSearchError('');
      } else {
        setSearchError('الرقم الجامعي غير موجود أو لا توجد جلسات امتحانية حالية');
        setSearchResults(null);
      }
    }, 400);
  };

  const handleUserChange = (val: string) => {
    setUsername(val);
    if (val.trim() === '116823' || val.trim() === 'haydaraa_116823') {
      setShowOtp(true);
    } else {
      setShowOtp(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#b7c1c5', minHeight: '100vh', fontFamily: 'Tahoma, Arial, Helvetica, sans-serif', fontSize: '11px', color: '#434343' }}>
      <table cellSpacing={0} cellPadding={0} align="center" border={0} style={{ width: '100%', maxWidth: '980px', margin: '0 auto', backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td width="3%" style={{ backgroundColor: '#ffffff' }} height="108">&nbsp;</td>
            <td style={{ backgroundColor: '#ffffff', height: '108px' }}>
              {/* Header Table */}
              {/* Header Table - Image Version */}
              <table cellSpacing={0} cellPadding={0} width="772" align="center" border={0} style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ backgroundColor: '#005a82', textAlign: 'center', padding: 0 }}>
                      <img 
                        src={headerImage} 
                        alt="Syrian Virtual University Header" 
                        style={{ 
                          width: '100%', 
                          maxWidth: '980px', /* ليتطابق مع عرض الجدول الرئيسي */
                          height: 'auto', 
                          maxHeight: '150px', /* يمكنك تعديل هذا الارتفاع حسب حاجة تصميم صورتك */
                          objectFit: 'cover', 
                          display: 'block',
                          margin: '0 auto'
                        }} 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Navigation Bar */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ width: '100%', backgroundColor: '#04587d', borderBottom: '3.5px solid #b79b5b' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '0 25px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px', height: '42px', fontFamily: 'Arial, sans-serif' }}>
                        <a href="#home" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14.5px', display: 'flex', alignItems: 'center' }}>Home</a>
                        <a href="#portal" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14.5px', display: 'flex', alignItems: 'center' }}>SVU Portal</a>
                        <a href="#email" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14.5px', display: 'flex', alignItems: 'center' }}>E-mail</a>
                        <a href="#lms" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14.5px', display: 'flex', alignItems: 'center' }}>LMS</a>
                        <a href="#request" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14.5px', display: 'flex', alignItems: 'center' }}>Request system</a>
                        <a href="#english" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14.5px', display: 'flex', alignItems: 'center' }}>English Courses</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Dotted Divider */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0}>
                <tbody>
                  <tr style={{ backgroundColor: '#ffffff' }}>
                    <td height="10" style={{ paddingTop: '3px' }}>
                      <div style={{ height: '1px', borderTop: '1px dotted #808080', width: '100%' }}></div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Main Body Grid */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0}>
                <tbody>
                  <tr>
                    {/* Left Sidebar Panel (#left_panel) */}
                    <td valign="top" style={{ width: leftPanelVisible ? '190px' : '20px', transition: 'width 0.2s' }}>
                      {leftPanelVisible ? (
                        <div style={{ width: '190px', display: 'block', margin: '0 auto' }} id="left_panel">
                          
                          {/* Logged in User Box */}
                          {isLoggedIn ? (
                            <table cellSpacing={0} cellPadding={0} width="100%" border={0} style={{ marginBottom: '10px', position: 'relative' }}>
                              <tbody>
                                <tr>
                                  <td width="5">&nbsp;</td>
                                  <td>
                                    <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0}>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div style={{ position: 'relative', width: '85px', marginBottom: '4px' }}>
                                              <img 
                                                src={studentPhoto} 
                                                alt="haydaraa alkadi" 
                                                width="85" 
                                                height="113" 
                                                onClick={() => setPhotoModalOpen(true)}
                                                style={{ width: '85px', height: '113px', objectFit: 'cover', border: '1px solid #CCCCCC', display: 'block', cursor: 'pointer' }}
                                                referrerPolicy="no-referrer"
                                                title="أنقر لتكبير الصورة الشخصية"
                                              />
                                            </div>
                                            <span className="smenu" style={{ color: '#3d7ab8', fontWeight: 'bold' }}>Welcome: {isAdmin ? 'Admin User' : 'haydaraa alkadi'}</span><br />
                                            <div id="chng_t_d" style={{ paddingTop: '2px' }}>
                                              <table cellPadding={0} cellSpacing={1} border={0} width="100%">
                                                <tbody>
                                                  <tr style={{ height: '16px' }}>
                                                    <td style={{ color: '#555' }}>User Login: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066', fontWeight: 'bold' }}>{isAdmin ? 'admin' : 'haydaraa_116823'}</td>
                                                  </tr>
                                                  <tr style={{ height: '16px' }}>
                                                    <td width="55" style={{ color: '#555' }}>Group: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066', fontWeight: 'bold' }}>{isAdmin ? 'Administrator' : 'Student'}</td>
                                                  </tr>
                                                  <tr style={{ height: '16px' }}>
                                                    <td style={{ color: '#555' }}>Last Login: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066' }}>2026-09-14 15:31:37</td>
                                                  </tr>
                                                  <tr>
                                                    <td style={{ color: '#555' }}>Login IP: </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066' }}>51.158.195.11</td>
                                                  </tr>
                                                  <tr style={{ height: '16px' }}>
                                                    <td style={{ color: '#555' }}>Log out </td>
                                                    <td style={{ paddingLeft: '5px', backgroundColor: '#F9F9F9', color: '#FF0066' }}>
                                                      <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ color: '#FF0066', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                                        <img src={exitIcon} alt="exit" style={{ width: '12px', height: '12px', display: 'inline-block' }} />
                                                        exit from svuis
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          ) : (
                            /* Login Box Table for Unauthenticated */
                            <table cellSpacing={0} cellPadding={0} width="94%" align="center" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #C0C0C0', backgroundColor: '#F7F7F7', marginBottom: '10px' }}>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="smenu" style={{ backgroundColor: '#EDEDED', padding: '4px', fontWeight: 'bold', color: '#3a618c' }}>
                                      🔒 Login
                                    </div>
                                    <div style={{ padding: '6px' }}>
                                      {errorMessage && (
                                        <div style={{ color: 'red', backgroundColor: '#FFFFCC', border: '1px dotted red', padding: '4px', fontSize: '11px', marginBottom: '6px', textAlign: 'center', fontWeight: 'bold' }}>
                                          {errorMessage}
                                        </div>
                                      )}
                                      <form onSubmit={handleLogin}>
                                        <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                          <tbody>
                                            <tr>
                                              <td align="right"><span style={{ color: '#3a618c' }}>username</span></td>
                                              <td width="2"></td>
                                              <td align="left">
                                                <input 
                                                  type="text" 
                                                  name="user_name"
                                                  value={username}
                                                  onChange={(e) => handleUserChange(e.target.value)}
                                                  className="login_input"
                                                  style={{ fontSize: '11px', fontFamily: 'Verdana, Tahoma', width: '100px', height: '18px', padding: '0px', color: '#054B8B', border: '1px solid #7F9DB9' }}
                                                />
                                              </td>
                                            </tr>
                                            <tr style={{ height: '20px' }}>
                                              <td align="right"><span style={{ color: '#3a618c' }}>password</span></td>
                                              <td></td>
                                              <td align="left">
                                                <input 
                                                  type="password" 
                                                  name="user_pass"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  className="login_input"
                                                  style={{ fontSize: '11px', fontFamily: 'Verdana, Tahoma', width: '100px', height: '18px', padding: '0px', color: '#054B8B', border: '1px solid #7F9DB9' }}
                                                />
                                              </td>
                                            </tr>
                                            {showOtp && (
                                              <tr style={{ height: '20px' }} id="tr_otp">
                                                <td align="right"><span style={{ color: 'red' }}>OTP</span></td>
                                                <td></td>
                                                <td align="left">
                                                  <input 
                                                    type="password" 
                                                    name="user_otp"
                                                    value={userOtp}
                                                    onChange={(e) => setUserOtp(e.target.value)}
                                                    className="login_input"
                                                    style={{ fontSize: '11px', fontFamily: 'Verdana, Tahoma', width: '100px', height: '18px', padding: '0px', color: '#054B8B', border: '1px solid #7F9DB9' }}
                                                  />
                                                </td>
                                              </tr>
                                            )}
                                            <tr style={{ height: '22px' }}>
                                              <td colSpan={3} style={{ padding: '4px 0', textAlign: 'center' }}>
                                                <input 
                                                  type="submit" 
                                                  value="login" 
                                                  className="btn1"
                                                  style={{ fontSize: '10px', fontFamily: 'Verdana, Tahoma', backgroundColor: '#ffffff', border: '1px solid #7F9DB9', color: '#2A5C8B', padding: '2px 8px', cursor: 'pointer', fontWeight: 'bold' }}
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </form>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}

                          <div style={{ height: '6px' }}></div>

                          {/* Student User Guides Link */}
                          <div style={{ padding: '3px 0 5px 2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <img src={infoIcon} alt="Guides" style={{ width: '13px', height: '13px', display: 'inline-block' }} />
                            <a href="#guides" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileP'); }} style={{ color: '#3d7ab8', fontWeight: 'bold', textDecoration: 'none', fontSize: '11px' }}>
                              Student User Guides
                            </a>
                          </div>

                          {/* Register Student Menu */}
                          <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ margin: '3px 0' }}>
                            <tbody>
                              <tr>
                                <td style={{ cursor: 'pointer', width: '16px' }} onClick={() => setRegisterMenuOpen(!registerMenuOpen)}>
                                  <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#555', fontFamily: 'monospace' }}>{registerMenuOpen ? '➖' : '➕'}</span>
                                </td>
                                <td className="smenu" style={{ cursor: 'pointer', fontSize: '11px' }} onClick={() => setRegisterMenuOpen(!registerMenuOpen)}>
                                  <b style={{ color: '#3d7ab8' }}>Register Student</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {registerMenuOpen && (
                            <div id="d3" style={{ display: 'block', paddingLeft: '12px', lineHeight: '18px' }}>
                              <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                <tbody>
                                  <tr>
                                    <td width="10" style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#oldReg" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('oldReg'); }} style={{ color: activeTab === 'oldReg' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Registration for old students
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#placement" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('placement'); }} style={{ color: activeTab === 'placement' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Registration in Placement Test
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#payments" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('payments'); }} style={{ color: activeTab === 'payments' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        student's payments
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#average" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('average'); }} style={{ color: activeTab === 'average' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Student Current Average
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#payments" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('payments'); }} style={{ color: activeTab === 'payments' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        E-Payment
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#updateReg" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('updateReg'); }} style={{ color: activeTab === 'updateReg' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Update Student Registration
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#naqaba" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('naqaba'); }} style={{ color: activeTab === 'naqaba' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        upload Naqaba File
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#military" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('military'); }} style={{ color: activeTab === 'military' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        upload Military File
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                    <td>
                                      <a className="smenublue" href="#profileP" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileP'); }} style={{ color: activeTab === 'profileP' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Personal Profile
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#999', fontSize: '10px' }}>└</td>
                                    <td>
                                      <a className="smenublue" href="#profileS" onClick={(e) => { e.preventDefault(); if(isLoggedIn) setActiveTab('profileS'); }} style={{ color: activeTab === 'profileS' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                        Studies Profile
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {isLoggedIn && (
                            <>
                              <div style={{ height: '1px', borderTop: '1px dotted #ccc', margin: '6px 0' }}></div>
                              
                              {/* Student Area Menu */}
                              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ margin: '3px 0' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ cursor: 'pointer', width: '16px' }} onClick={() => setStudentAreaOpen(!studentAreaOpen)}>
                                      <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#555' }}>{studentAreaOpen ? '➖' : '➕'}</span>
                                    </td>
                                    <td className="smenu" style={{ cursor: 'pointer', fontSize: '11px' }} onClick={() => setStudentAreaOpen(!studentAreaOpen)}>
                                      <b style={{ color: '#3d7ab8' }}>Student Area</b>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {studentAreaOpen && (
                                <div style={{ display: 'block', paddingLeft: '12px', lineHeight: '18px' }}>
                                  <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                    <tbody>
                                      <tr>
                                        <td width="10" style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <a 
                                            href="#chooseSpec" 
                                            onClick={(e) => { e.preventDefault(); setActiveTab('chooseSpec'); }}
                                            style={{ color: activeTab === 'chooseSpec' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                          >
                                            choose Specialization
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }} onClick={() => setStudentProfileSubOpen(!studentProfileSubOpen)}>
                                            <a 
                                              href="#profileP" 
                                              onClick={(e) => { e.preventDefault(); setActiveTab('profileP'); }}
                                              style={{ color: activeTab === 'profileP' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                            >
                                              Student Profile
                                            </a>
                                          </div>
                                          {studentProfileSubOpen && (
                                            <div style={{ paddingLeft: '10px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#naqaba" onClick={(e) => { e.preventDefault(); setActiveTab('naqaba'); }} style={{ color: activeTab === 'naqaba' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  upload Naqaba File
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#military" onClick={(e) => { e.preventDefault(); setActiveTab('military'); }} style={{ color: activeTab === 'military' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  upload Military File
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>└</span>
                                                <a href="#changePass" onClick={(e) => { e.preventDefault(); setActiveTab('changePass'); }} style={{ color: activeTab === 'changePass' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  Change Password
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <a 
                                            href="#profileS" 
                                            onClick={(e) => { e.preventDefault(); setActiveTab('profileS'); }}
                                            style={{ color: activeTab === 'profileS' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}
                                          >
                                            Studies Profile
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <a 
                                            href="https://svuonline.org/ar/%D8%A7%D9%84%D8%AA%D9%82%D9%88%D9%85%20%D8%A7%D9%84%D8%B3%D9%86%D9%88%D9%8A" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ color: '#6699cc', textDecoration: 'none' }}
                                          >
                                            Year Calendar
                                          </a>
                                        </td>
                                      </tr>

                                      {/* Class & Lectures Group */}
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>├</td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer', marginTop: '2px' }} onClick={() => setClassLecturesOpen(!classLecturesOpen)}>
                                            <img src={userIcon} alt="User" style={{ width: '12px', height: '12px', display: 'inline-block' }} />
                                            <b style={{ color: '#434343' }}>Class &amp; Lectures</b>
                                          </div>
                                          {classLecturesOpen && (
                                            <div style={{ paddingLeft: '10px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#lectureTutor" onClick={(e) => { e.preventDefault(); setActiveTab('lectureTutor'); }} style={{ color: activeTab === 'lectureTutor' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  Lecture&amp;Tutor time
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Select Classes
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: activeTab === 'classes' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  My Classes
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Course &amp; Tutors
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>├</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Lecture Time Table
                                                </a>
                                              </div>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>└</span>
                                                <a href="#classes" onClick={(e) => { e.preventDefault(); setActiveTab('classes'); }} style={{ color: '#6699cc', textDecoration: 'none' }}>
                                                  Download Sessions
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>

                                      {/* Exam Area Group */}
                                      <tr>
                                        <td style={{ color: '#999', fontSize: '10px' }}>└</td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer', marginTop: '2px' }} onClick={() => setExamAreaOpen(!examAreaOpen)}>
                                            <img src={userIcon} alt="User" style={{ width: '12px', height: '12px', display: 'inline-block' }} />
                                            <b style={{ color: '#434343' }}>Exam Area</b>
                                          </div>
                                          {examAreaOpen && (
                                            <div style={{ paddingLeft: '10px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <span style={{ color: '#999', fontSize: '10px' }}>└</span>
                                                <a href="#exams" onClick={(e) => { e.preventDefault(); setActiveTab('exams'); }} style={{ color: activeTab === 'exams' ? '#DEAA5A' : '#6699cc', textDecoration: 'none' }}>
                                                  Exam Time Table
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </>
                          )}

                          <div style={{ height: '14px', backgroundImage: 'url(images/dotted_pixel_horizontal.gif)', width: '100%', margin: '10px 0' }}></div>

                          {/* Social Channel Banners */}
                          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <a href="#exams" onClick={(e) => { e.preventDefault(); setActiveTab('exams'); }} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                              <img 
                                src={expertAssessment} 
                                alt="EXams EXpert Assessment Management System" 
                                style={{ border: 'none', maxWidth: '100%' }} 
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  (e.currentTarget.nextSibling as HTMLElement).style.display = 'block';
                                }}
                              />
                              <div style={{ display: 'none', backgroundColor: '#005a82', color: '#ffffff', padding: '6px 4px', fontWeight: 'bold', borderRadius: '3px', fontSize: '11px' }}>
                                📑 EXpert Assessment
                              </div>
                            </a>
                          </div>

                          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <a href="https://www.youtube.com/channel/UCJwPgp0tOp1ZqkzbmDvFSaw" target="_blank" rel="noreferrer" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                              <img 
                                src="images/youtube.jpg" 
                                alt="SVU YouTube Channel" 
                                style={{ border: 'none', maxWidth: '100%' }} 
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  (e.currentTarget.nextSibling as HTMLElement).style.display = 'block';
                                }}
                              />
                              <div style={{ display: 'none', backgroundColor: '#CC0000', color: '#ffffff', padding: '6px 4px', fontWeight: 'bold', borderRadius: '3px', fontSize: '11px' }}>
                                ▶ SVU YouTube Channel
                              </div>
                            </a>
                          </div>

                          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <a href="https://www.facebook.com/svuonline.org" target="_blank" rel="noreferrer" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                              <img 
                                src="images/facebook.jpg" 
                                alt="SVU Facebook Page" 
                                style={{ border: 'none', maxWidth: '100%' }} 
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  (e.currentTarget.nextSibling as HTMLElement).style.display = 'block';
                                }}
                              />
                              <div style={{ display: 'none', backgroundColor: '#3b5998', color: '#ffffff', padding: '6px 4px', fontWeight: 'bold', borderRadius: '3px', fontSize: '11px' }}>
                                f SVU Facebook Page
                              </div>
                            </a>
                          </div>

                          <div style={{ marginTop: '15px' }}>
                            <button 
                              onClick={() => setLeftPanelVisible(false)}
                              style={{ fontSize: '9px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                              ◄ Hide Panel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '5px' }}>
                          <button 
                            onClick={() => setLeftPanelVisible(true)}
                            style={{ fontSize: '10px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}
                          >
                            ►
                          </button>
                        </div>
                      )}
                    </td>

                    <td width="1" style={{ backgroundColor: '#CCCCCC' }}></td>

                    {/* Main Content Area */}
                    <td valign="top" style={{ padding: '10px' }}>
                      {!isLoggedIn ? (
                        /* Unauthenticated Landing / Exam Time Search Form */
                        <div>
                          {/* Errors Block */}
                          {searchError && (
                            <div id="errors-block" className="msg_ok_mofadalah" style={{ backgroundColor: '#FFFFCC', color: 'red', border: '1px dotted #FF0000', textAlign: 'left', padding: '8px', marginBottom: '10px', fontWeight: 'bold' }}>
                              <ul>
                                <li>{searchError}</li>
                              </ul>
                            </div>
                          )}

                          <form name="exam_time_table" id="exam_time_table" style={{ width: '100%' }} onSubmit={handleGetTime}>
                            <table cellSpacing={0} cellPadding={0} width="98%" align="center" border={0} style={{ backgroundColor: '#EFEFEF', border: '1px solid #C0C0C0', padding: '10px' }}>
                              <tbody>
                                <tr>
                                  <td> &nbsp; </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="left" style={{ width: '20%', paddingLeft: '15px', color: '#666666', height: '22px' }}>
                                    <b>Student Id:</b>
                                  </td>
                                  <td className="gray_padd10" align="left" style={{ width: '58%', paddingLeft: '10px' }}>
                                    <input 
                                      type="number" 
                                      id="StudentID" 
                                      name="StudentID" 
                                      value={studentIdInput}
                                      onChange={(e) => setStudentIdInput(e.target.value)}
                                      className="input" 
                                      style={{ width: '75%', margin: '0px 40px', borderColor: '#a69448', borderStyle: 'solid', borderWidth: '1px', padding: '2px', fontSize: '11px' }}
                                      placeholder="e.g. 116823"
                                    />
                                  </td>
                                  <td className="gray_padd15" align="left" style={{ width: '22%', paddingLeft: '15px', color: '#666666' }}>
                                    <b>:الرقم الجامعي للطالب</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={3}> &nbsp; </td>
                                </tr>
                                <tr>
                                  <td align="center" className="tdpadding" colSpan={3} style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                                    <button 
                                      type="submit" 
                                      id="cclick" 
                                      disabled={searchLoading}
                                      style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px', backgroundColor: '#005a82', color: '#ffffff', border: 'none', padding: '4px 15px', cursor: 'pointer' }}
                                    >
                                      {searchLoading ? 'Sending...' : 'Get Time'}
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="right" colSpan={3} style={{ paddingLeft: '15px', color: '#666666' }}>
                                    <h1 style={{ margin: '5px', fontSize: '12px', color: '#434d4b', fontFamily: 'tahoma, helvetica' }}>
                                      <b>تفاصيل مركز التعلم مدى الحياة </b>
                                      <a target="_blank" rel="noreferrer" href="https://svuonline.org/ar/%D8%A7%D9%84%D8%A7%D8%AA%D8%B5%D8%A7%D9%84-%D8%A2%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8-%D9%88%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%85-%D9%85%D8%AF%D9%89-%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9" style={{ color: '#0066FF', textDecoration: 'none' }}> اضغط هنا </a>
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="right" colSpan={3} style={{ paddingLeft: '15px', color: '#666666' }}>
                                    <h1 style={{ margin: '5px', fontSize: '12px', color: '#434d4b', fontFamily: 'tahoma, helvetica' }}>
                                      <b>تفاصيل مراكز النفاذ الداخلية على موقع الجامعة </b>
                                      <a target="_blank" rel="noreferrer" href="https://svuonline.org/ar/%D9%85%D8%B1%D8%A7%D9%83%D8%B2-%D8%A7%D9%84%D9%86%D9%81%D8%A7%D8%B0/%D8%AF%D8%A7%D8%AE%D9%84%D9%8A%D8%A9" style={{ color: '#0066FF', textDecoration: 'none' }}> اضغط هنا </a>
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="gray_padd15" align="right" colSpan={3} style={{ paddingLeft: '15px', color: '#666666' }}>
                                    <h1 style={{ margin: '5px', fontSize: '12px', color: '#434d4b', fontFamily: 'tahoma, helvetica' }}>
                                      <b>تفاصيل مراكز النفاذ الخارجية على موقع الجامعة </b>
                                      <a target="_blank" rel="noreferrer" href="https://svuonline.org/ar/%D9%85%D8%B1%D8%A7%D9%83%D8%B2-%D8%A7%D9%84%D9%86%D9%81%D8%A7%D8%B0/%D8%AE%D8%A7%D8%B1%D8%AC%D9%8A%D8%A9" style={{ color: '#0066FF', textDecoration: 'none' }}> اضغط هنا </a>
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>

                          <br />

                          {/* Results Table (#results) */}
                          {searchResults && searchResults.length > 0 && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px', textAlign: 'center' }}>
                                📅 جدول مواعيد الامتحانات للطالب (Student ID: {studentIdInput}) - حيدرة العلي (Haydara Al Ali)
                              </div>
                              <table id="results" dir="ltr" width="98%" border={5} cellSpacing={0} cellPadding={4} align="center" style={{ borderCollapse: 'collapse', border: '3px solid #20639b', textAlign: 'center', backgroundColor: '#ffffff', margin: '0 auto', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold' }}>
                                    <td width="10%">رمز المقرر</td>
                                    <td width="30%">اسم المقرر (Course Title)</td>
                                    <td width="10%">الفصل</td>
                                    <td width="15%">تاريخ الامتحان</td>
                                    <td width="15%">التوقيت (Time)</td>
                                    <td width="15%">مركز الامتحانات</td>
                                    <td width="10%">القاعة / المقعد</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchResults.map((item, idx) => (
                                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#F7F7F7' : '#ffffff' }}>
                                      <td><b>{item.code}</b></td>
                                      <td style={{ textAlign: 'right', paddingRight: '8px' }}>{item.name}</td>
                                      <td>{item.term}</td>
                                      <td>{item.date}</td>
                                      <td>{item.time}</td>
                                      <td>{item.center}</td>
                                      <td>{item.seat}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Authenticated Student Portal */
                        <div>
                          {/* Studies Details Header from reference image */}
                           <div style={{ marginBottom: "12px", fontSize: "12px" }}>
                             <div style={{ color: "#005a82", fontWeight: "bold", fontSize: "13px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                               <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "#8a7d3b", borderRadius: "50%" }}></span>
                               <span>Syrian Virtual University Information System <span style={{ color: "#8a7d3b" }}>(SVUIS)</span></span>
                             </div>
                             {activeTab !== 'chooseSpec' && (
                               <div style={{ color: "#6f7b79", fontWeight: "bold", lineHeight: "18px" }}>
                                 &gt; Student Section: <i>Studies Details:</i><br />
                                 &nbsp;&nbsp;&nbsp;o Archive Managments for Student
                               </div>
                             )}
                           </div>

                                     {/* TAB 0: std_profileP.php (Personal Profile) */}
                          {activeTab === 'profileP' && (
                            <div>
                              <div className="smenu" style={{ marginBottom: '6px', color: '#6f7b79', fontWeight: 'bold' }}>
                                &nbsp;<b>Student Section: <i>Personal Profile (std_profileP.php):</i></b>
                              </div>

                              {/* Student Summary Pink Box */}
                              <table cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginBottom: '10px' }}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div style={{ padding: '8px', border: '1px solid #FEB8AE', backgroundColor: '#FFF3EF', lineHeight: '18px' }}>
                                        Student ID: <span style={{ color: '#0077FF', fontWeight: 'bold' }}>116823</span><br />
                                        Student Name: <span style={{ color: '#0077FF', textTransform: 'capitalize', fontWeight: 'bold' }}>haydaraa yaqub alkadi</span><br />
                                        Login Name: <span style={{ color: '#0077FF' }}>haydaraa_116823</span><br />
                                        Baclurea Marks: <span style={{ color: '#0077FF' }}>Baclurea Marks</span><br />
                                        Degree(s) : <span style={{ color: '#0077FF' }}>الثانوية -</span><br />
                                        Degree Specialization : <span style={{ color: '#0077FF' }}>علمي 2013 وما بعدها</span><br />
                                        Registration Date: <span style={{ color: '#0077FF' }}>2018-10-24 13:53:31</span><br />
                                        Last Access Date: <span style={{ color: '#0077FF' }}>2026-09-15 13:54:40</span><br />
                                        Registration Term: <span style={{ color: '#0077FF' }}>F18</span><br />
                                        Student Status: <span style={{ color: '#FF00FF', fontWeight: 'bold' }}>active</span><br />
                                        Email Status: <span style={{ color: '#FF00FF', fontWeight: 'bold' }}>Active</span><br />
                                        Student Scholarship: <span style={{ color: '#ff0004' }}></span><br />
                                        Old Student ID: <span style={{ color: '#0077FF' }}>0</span><br />
                                        
                                        <div style={{ marginTop: '6px' }}>
                                          Student in Program (s):
                                          <div style={{ color: '#0077FF', padding: '5px 0', border: '0px solid #cccccc' }}>
                                            <table cellPadding={3} cellSpacing={0} border={1} width="100%" style={{ borderCollapse: 'collapse', borderColor: '#cccccc' }}>
                                              <tbody>
                                                <tr style={{ backgroundColor: '#FEF9DF', color: '#333' }}>
                                                  <td><b>Program Info</b></td>
                                                  <td><b>Degree</b></td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Bachelor of Law (BL) / BL: [<span style={{ color: 'blue', fontWeight: 'bold' }}>Registered</span>, avg.= ,men.=, No= , Date=,Fix_avg.=UnFixed] (Order:1)<br />
                                                    Profile validated by coordinator
                                                  </td>
                                                  <td>الثانوية - علمي 2013 وما بعدها</td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Bachelor in Economics (BSCE) / : [<span style={{ color: 'orange', fontWeight: 'bold' }}>Conditional</span>, avg.= ,men.=, No= , Date=,Fix_avg.=UnFixed] (Order:2)<br />
                                                    Profile validated by coordinator
                                                  </td>
                                                  <td>الثانوية - علمي 2013 وما بعدها</td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Bachelor in Mass Communication (BMC) / BMC_Com_spec: [<span style={{ color: 'orange', fontWeight: 'bold' }}>Conditional</span>, avg.= ,men.=, No= , Date=,Fix_avg.=UnFixed] (Order:3)<br />
                                                    Profile validated by coordinator
                                                  </td>
                                                  <td>الثانوية - علمي 2013 وما بعدها</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                        <hr style={{ border: 0, height: '1px', backgroundColor: '#CCCCCC', margin: '8px 0' }} />

                                        Student Account ID: <span style={{ color: '#0077FF', fontWeight: 'bold' }}>226089</span><br />
                                        Student Account Currency: <span style={{ color: '#0077FF' }}>Syrian Pound [SYP]</span><br />
                                        Student Account Balance: <span style={{ color: '#0077FF' }}>0.00</span><br />
                                        Student Account Status: <span style={{ color: '#339900', fontWeight: 'bold' }}>Active</span><br />
                                      </div>
                                    </td>
                                    <td width="10"></td>
                                    <td width="95" valign="top">
                                      <div style={{ padding: '5px', border: '1px solid #FEB8AE', backgroundColor: '#FFF3EF', textAlign: 'center' }}>
                                        <img 
                                          src={studentPhoto} 
                                          alt="haydaraa alkadi" 
                                          width="85" 
                                          height="113" 
                                          onClick={() => setPhotoModalOpen(true)}
                                          style={{ width: '85px', height: '113px', objectFit: 'cover', border: '1px solid #FEB8AE', cursor: 'pointer', display: 'block', margin: '0 auto' }} 
                                          referrerPolicy="no-referrer"
                                          title="أنقر لمشاهدة الصورة الشخصية بحجم كامل"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {/* Personal Profile Details Grid */}
                              <table cellSpacing={0} cellPadding={4} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px' }}>
                                <tbody>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '20%' }}>First Name</td>
                                    <td className="tdpadding_h" style={{ width: '30%' }}>haydaraa</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '20%' }}>In Arabic</td>
                                    <td className="tdpadding_h" style={{ width: '30%' }}>حيدره</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Father Name</td>
                                    <td className="tdpadding_h">yaqub</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>In Arabic</td>
                                    <td className="tdpadding_h">يعقوب</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Mother Name</td>
                                    <td className="tdpadding_h">hanan</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>In Arabic</td>
                                    <td className="tdpadding_h">حنان</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Surname</td>
                                    <td className="tdpadding_h">alkadi</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>In Arabic</td>
                                    <td className="tdpadding_h">القاضي</td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Place Of Birth</td>
                                    <td className="tdpadding_h">قرداحه</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Date Of Birth</td>
                                    <td className="tdpadding_h">2000-02-20</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Gender</td>
                                    <td className="tdpadding_h">0</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Martial Status</td>
                                    <td className="tdpadding_h">0</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Military Status</td>
                                    <td className="tdpadding_h">1</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Military Office</td>
                                    <td className="tdpadding_h">القرداحة</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Civil Place &amp; Num.</td>
                                    <td className="tdpadding_h" colSpan={3}>المتن 28</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Nationality</td>
                                    <td className="tdpadding_h">Syrian</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>SID</td>
                                    <td className="tdpadding_h"><b>06200083193</b></td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Country</td>
                                    <td className="tdpadding_h">Syria</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>City</td>
                                    <td className="tdpadding_h">Latakia</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Address</td>
                                    <td className="tdpadding_h">القرداحة</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>ZIP/Postal Code</td>
                                    <td className="tdpadding_h"></td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Phone</td>
                                    <td className="tdpadding_h">04141564207</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Mobile</td>
                                    <td className="tdpadding_h">0991187851</td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Email</td>
                                    <td className="tdpadding_h">haydaraa554@gmail.com</td>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>Fax</td>
                                    <td className="tdpadding_h"></td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>صورة مصدقة عن وثيقة التخرج 1</td>
                                    <td className="tdpadding_h" colSpan={3}>
                                      <a href="#view" onClick={(e) => e.preventDefault()} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_Degree_1_06200083193.jpg
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>صورة عن الهوية الشخصية/جواز السفر</td>
                                    <td className="tdpadding_h" colSpan={3}>
                                      <a href="#view" onClick={(e) => e.preventDefault()} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_SID_.jpg
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>صورة شخصية</td>
                                    <td className="tdpadding_h" colSpan={3}>
                                      <a href="#view" onClick={(e) => e.preventDefault()} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        <span onClick={() => setPhotoModalOpen(true)} style={{ cursor: 'pointer' }}>upload_PHOTO_06200083193.jpg</span>
                                      </a>
                                    </td>
                                  </tr>

                                  <tr style={{ height: '5px' }}><td colSpan={4}></td></tr>

                                  <tr>
                                    <td className="tdhead_left_colored" style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>الملاحظات والرسائل</td>
                                    <td className="tdpadding" colSpan={3}>
                                      <textarea 
                                        readOnly 
                                        value={`تم تدقيق طلبك بنجاح \n  Your Student ID is : 116823 \n You can reprint your application using the following link: \n https://svuis.svuonline.org/SVUIS/print_student_info.php?newStd=1&student_id=116823&s=06200083193 \n **__** WROTE BY: bit_coor** TIME:  2019-01-15 12:13:49 \n ########################  \n عزيزي الطالب: \n يرجى تحميل صورة الهوية الشخصية بشكل واضح على الجهتين \n Your Student ID is : 116823 \n You can reprint your application using the following link: \n https://svuis.svuonline.org/SVUIS/print_student_info.php?newStd=1&student_id=116823&s=06200083193 \n **__** WROTE BY: bmc_coor** TIME:  2018-10-25 12:47:38 \n ######################## \n ######################## `}
                                        style={{ width: '100%', height: '140px', fontSize: '11px', fontFamily: 'Tahoma, Arial', color: '#434343' }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 1: std_profileS.php */}
                          {activeTab === 'profileS' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                Student Section: Studies Details: &nbsp;|&nbsp; <b>Archive Managments for Student (std_profileS.php)</b>
                              </div>

                              {termsLoading ? (
                                <div style={{ padding: '40px', textAlign: 'center', fontSize: '14px', color: '#005a82', fontWeight: 'bold' }}>
                                  ⏳ Loading student academic records from database...
                                </div>
                              ) : (
                                <div>
                                  {/* Admin Semester Controls */}
                                  {isAdmin && (
                                    <div style={{ backgroundColor: '#EEF3F9', border: '2px solid #20639b', padding: '12px', marginBottom: '15px', borderRadius: '4px' }}>
                                      <div style={{ fontWeight: 'bold', color: '#104F8A', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        ⚙️ SYSTEM ADMINISTRATOR CONTROLS (تحكم مدير النظام)
                                      </div>
                                      <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#555' }}>
                                        You are logged in as admin. You can edit grades, add or delete courses, and modify semester headers. Changes are saved instantly to the local <code style={{ backgroundColor: '#fff', padding: '1px 4px', border: '1px solid #ccc' }}>database.json</code> file.
                                      </p>
                                      <button 
                                        onClick={() => {
                                          const termName = prompt('Enter Semester Term Code (e.g., S26):', 'S26');
                                          if (!termName) return;
                                          const yearVal = prompt('Enter Year (e.g., 2026):', '2026');
                                          if (!yearVal) return;
                                          const countPEVal = prompt('Enter count of P & E Courses:', '0');
                                          if (countPEVal === null) return;
                                          
                                          const updated = [
                                            {
                                              term: termName,
                                              year: yearVal,
                                              countPE: parseInt(countPEVal, 10) || 0,
                                              courses: []
                                            },
                                            ...terms
                                          ];
                                          saveTermsToDb(updated);
                                        }}
                                        style={{ backgroundColor: '#005a82', color: '#ffffff', padding: '5px 12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', borderRadius: '2px' }}
                                      >
                                        ➕ Add New Semester Block (إضافة فصل دراسي جديد)
                                      </button>
                                    </div>
                                  )}

                                  {/* Semester Loops */}
                                  {terms.map((termBlock, termIdx) => (
                                    <div key={termIdx} style={{ marginBottom: '22px' }}>
                                      {/* Semester Header Yellow Banner */}
                                      <div style={{ 
                                        backgroundColor: '#FCF7D3', 
                                        color: '#6F5C2D', 
                                        padding: '6px 10px', 
                                        fontWeight: 'bold', 
                                        fontSize: '12px', 
                                        border: '1px solid #E2D3A1', 
                                        borderBottom: 'none',
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center' 
                                      }}>
                                        <span>
                                          📅 {termBlock.term} &nbsp;&nbsp; {termBlock.year}
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                          <span>Count of P & E Course : {termBlock.countPE}</span>
                                          {isAdmin && (
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                              <button 
                                                onClick={() => {
                                                  setEditingTermBlock({
                                                    termIdx,
                                                    term: termBlock.term,
                                                    year: termBlock.year,
                                                    countPE: termBlock.countPE
                                                  });
                                                }}
                                                style={{ backgroundColor: '#DFECF6', color: '#104F8A', border: '1px solid #B2C9DF', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                                              >
                                                Edit Header
                                              </button>
                                              <button 
                                                onClick={() => {
                                                  if (confirm(`Are you sure you want to delete the entire semester ${termBlock.term} ${termBlock.year}?`)) {
                                                    const updated = [...terms];
                                                    updated.splice(termIdx, 1);
                                                    saveTermsToDb(updated);
                                                  }
                                                }}
                                                style={{ backgroundColor: '#FFE6E6', color: '#CC0000', border: '1px solid #FFAAAA', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                                              >
                                                Delete Semester
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Courses Table */}
                                      <table cellSpacing={0} cellPadding={3} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #B2C9DF', backgroundColor: '#ffffff', fontSize: '11px', marginTop: '0px' }}>
                                        <thead>
                                          <tr style={{ backgroundColor: '#DFECF6', color: '#104F8A', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid #B2C9DF' }}>
                                            <td width="7%" style={{ border: '1px solid #B2C9DF', padding: '6px' }}>Special Status</td>
                                            <td width="4%" style={{ border: '1px solid #B2C9DF' }}>FA</td>
                                            <td width="3%" style={{ border: '1px solid #B2C9DF' }}>&nbsp;</td>
                                            <td width="26%" style={{ border: '1px solid #B2C9DF', textAlign: 'left', paddingLeft: '8px' }}>Course</td>
                                            <td width="15%" style={{ border: '1px solid #B2C9DF' }}>Class</td>
                                            <td width="5%" style={{ border: '1px solid #B2C9DF' }}>CHR</td>
                                            <td width="4%" style={{ border: '1px solid #B2C9DF' }}>E1</td>
                                            <td width="4%" style={{ border: '1px solid #B2C9DF' }}>E2</td>
                                            <td width="4%" style={{ border: '1px solid #B2C9DF' }}>E3</td>
                                            <td width="4%" style={{ border: '1px solid #B2C9DF' }}>M</td>
                                            <td width="4%" style={{ border: '1px solid #B2C9DF' }}>O</td>
                                            <td width="5%" style={{ border: '1px solid #B2C9DF' }}>P</td>
                                            <td width="5%" style={{ border: '1px solid #B2C9DF' }}>F</td>
                                            <td width="5%" style={{ border: '1px solid #B2C9DF' }}>Total</td>
                                            <td width="10%" style={{ border: '1px solid #B2C9DF' }}>{isAdmin ? 'Actions' : 'Helped'}</td>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {termBlock.courses.length === 0 ? (
                                            <tr>
                                              <td colSpan={15} style={{ textAlign: 'center', padding: '15px', color: '#666', fontStyle: 'italic', border: '1px solid #B2C9DF' }}>
                                                No courses registered in this semester block yet.
                                              </td>
                                            </tr>
                                          ) : (
                                            termBlock.courses.map((c: any, cIdx: number) => {
                                              // Alternating background for course rows (Row 1 and Row 2 have the SAME color)
                                              const rowBg = cIdx % 2 === 0 ? '#ffffff' : '#F4F8FB';
                                              
                                              return (
                                                <React.Fragment key={cIdx}>
                                                  {/* Row 1: Course Info */}
                                                  <tr style={{ backgroundColor: rowBg, textAlign: 'center' }}>
                                                    <td style={{ border: '1px solid #B2C9DF', padding: '5px' }}><b>{c.status}</b></td>
                                                    <td style={{ border: '1px solid #B2C9DF', color: c.fa === 'P' ? '#008000' : '#FF0000', fontWeight: 'bold' }}>{c.fa}</td>
                                                    <td style={{ border: '1px solid #B2C9DF', padding: '2px 0' }}>
                                                      <img src={moneyIcon} alt="money" style={{ width: '16px', height: '16px', display: 'block', margin: '0 auto' }} />
                                                    </td>
                                                    <td style={{ border: '1px solid #B2C9DF', textAlign: 'left', fontWeight: 'bold', paddingLeft: '8px', color: '#333333' }}>
                                                      {c.title}
                                                    </td>
                                                    <td style={{ border: '1px solid #B2C9DF', color: '#555555' }}>{c.code}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.chr}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.e1}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.e2}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.e3}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.m}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.o}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.p}</td>
                                                    <td style={{ border: '1px solid #B2C9DF', fontWeight: 'bold', color: c.fa === 'P' ? '#008000' : '#FF0000' }}>
                                                      {c.f}
                                                    </td>
                                                    <td style={{ border: '1px solid #B2C9DF', fontWeight: 'bold', color: '#0000FF' }}>
                                                      {c.total}
                                                    </td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>
                                                      {isAdmin ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                                                          <button 
                                                            onClick={() => setEditingCourse({ termIdx, courseIdx: cIdx, data: JSON.parse(JSON.stringify(c)) })}
                                                            style={{ backgroundColor: '#20639b', color: '#fff', border: 'none', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', borderRadius: '2px', fontWeight: 'bold' }}
                                                          >
                                                            Edit
                                                          </button>
                                                          <button 
                                                            onClick={() => {
                                                              if (confirm(`Delete course "${c.title}"?`)) {
                                                                const updated = [...terms];
                                                                updated[termIdx].courses.splice(cIdx, 1);
                                                                saveTermsToDb(updated);
                                                              }
                                                            }}
                                                            style={{ backgroundColor: '#FF0000', color: '#fff', border: 'none', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', borderRadius: '2px', fontWeight: 'bold' }}
                                                          >
                                                            Del
                                                          </button>
                                                        </div>
                                                      ) : (
                                                        <span>{c.helped}</span>
                                                      )}
                                                    </td>
                                                  </tr>

                                                  {/* Row 2: Sub course code & exam categories */}
                                                  <tr style={{ backgroundColor: rowBg, textAlign: 'center', fontSize: '10px', color: '#666666' }}>
                                                    <td colSpan={4} style={{ border: '1px solid #B2C9DF', textAlign: 'left', paddingLeft: '8px', color: '#444444' }}>
                                                      <b>{c.code2}</b>
                                                    </td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}></td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[0]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[1]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[2]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[3]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[4]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[5]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[6]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[7]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}>{c.extra && c.extra[8]}</td>
                                                    <td style={{ border: '1px solid #B2C9DF' }}></td>
                                                  </tr>
                                                </React.Fragment>
                                              );
                                            })
                                          )}
                                        </tbody>
                                      </table>

                                      {/* Add course button below each table */}
                                      {isAdmin && (
                                        <div style={{ marginTop: '5px', textAlign: 'right' }}>
                                          <button 
                                            onClick={() => {
                                              const updated = [...terms];
                                              const newCourse = {
                                                status: 'R',
                                                fa: 'F',
                                                title: 'New Course Title',
                                                code: `BL_NEW_${termBlock.term}`,
                                                chr: '18',
                                                e1: '-', e2: '-', e3: '-', m: '-', o: '-', p: '0', f: '0', total: '0',
                                                code2: 'NEW101',
                                                extra: ['1', '20', '0', '0', '0', '0', '0', '80', '100'],
                                                helped: ''
                                              };
                                              updated[termIdx].courses.push(newCourse);
                                              saveTermsToDb(updated);
                                              // Direct straight to editing
                                              setEditingCourse({
                                                termIdx,
                                                courseIdx: updated[termIdx].courses.length - 1,
                                                data: newCourse
                                              });
                                            }}
                                            style={{ backgroundColor: '#20639b', color: '#ffffff', padding: '3px 8px', border: 'none', cursor: 'pointer', fontSize: '10px', borderRadius: '2px', fontWeight: 'bold' }}
                                          >
                                            ➕ Add Course to {termBlock.term}
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* EDIT COURSE MODAL */}
                              {editingCourse && (
                                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontFamily: 'Arial, sans-serif' }}>
                                  <div style={{ backgroundColor: '#ffffff', width: '600px', maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto', padding: '24px', borderRadius: '4px', border: '3px solid #005a82', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #005a82', paddingBottom: '10px', marginBottom: '15px' }}>
                                      <h3 style={{ margin: 0, color: '#005a82', fontSize: '14px', fontWeight: 'bold' }}>
                                        📝 Edit Course Details (تعديل بيانات المقرر الدراسي)
                                      </h3>
                                      <button onClick={() => setEditingCourse(null)} style={{ border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer', color: '#999' }}>&times;</button>
                                    </div>
                                    
                                    <form onSubmit={(e) => {
                                      e.preventDefault();
                                      const updated = [...terms];
                                      updated[editingCourse.termIdx].courses[editingCourse.courseIdx] = editingCourse.data;
                                      saveTermsToDb(updated);
                                      setEditingCourse(null);
                                    }}>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '11px' }}>
                                        
                                        <div style={{ gridColumn: 'span 2' }}>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>Course Title (English)</label>
                                          <input 
                                            type="text" 
                                            required
                                            value={editingCourse.data.title}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, title: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>Class (Full Code)</label>
                                          <input 
                                            type="text" 
                                            required
                                            value={editingCourse.data.code}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, code: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>Course Code (Short)</label>
                                          <input 
                                            type="text" 
                                            required
                                            value={editingCourse.data.code2}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, code2: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>Special Status (R/D/W/I)</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.status}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, status: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>FA (P/F)</label>
                                          <select 
                                            value={editingCourse.data.fa}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, fa: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          >
                                            <option value="P">P (Passed)</option>
                                            <option value="F">F (Failed)</option>
                                            <option value="">None</option>
                                          </select>
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>CHR</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.chr}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, chr: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>E1 Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.e1}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, e1: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>E2 Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.e2}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, e2: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>E3 Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.e3}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, e3: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>M Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.m}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, m: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>O Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.o}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, o: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>P Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.p}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, p: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>F Score (Theoretical)</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.f}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, f: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>Total Score</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.total}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, total: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                          />
                                        </div>

                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>Helped</label>
                                          <input 
                                            type="text" 
                                            value={editingCourse.data.helped}
                                            onChange={(e) => {
                                              const updated = { ...editingCourse.data, helped: e.target.value };
                                              setEditingCourse({ ...editingCourse, data: updated });
                                            }}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '2px' }}
                                            placeholder="e.g., Helped or empty"
                                          />
                                        </div>

                                        <div style={{ gridColumn: 'span 2', marginTop: '10px', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                                          <h4 style={{ margin: '0 0 8px 0', fontSize: '10px', color: '#666' }}>Row 2 Detailed Metrics (Class Statistics)</h4>
                                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '4px' }}>
                                            {editingCourse.data.extra && editingCourse.data.extra.map((val: string, extraIdx: number) => (
                                              <div key={extraIdx}>
                                                <label style={{ fontSize: '8px', display: 'block', textAlign: 'center', color: '#555' }}>Col {extraIdx+1}</label>
                                                <input 
                                                  type="text" 
                                                  value={val}
                                                  onChange={(e) => {
                                                    const newExtra = [...editingCourse.data.extra];
                                                    newExtra[extraIdx] = e.target.value;
                                                    const updated = { ...editingCourse.data, extra: newExtra };
                                                    setEditingCourse({ ...editingCourse, data: updated });
                                                  }}
                                                  style={{ width: '100%', padding: '4px', fontSize: '9px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '2px' }}
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                      </div>

                                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
                                        <button 
                                          type="button" 
                                          onClick={() => setEditingCourse(null)} 
                                          style={{ padding: '5px 12px', border: '1px solid #ccc', backgroundColor: '#f5f5f5', color: '#333', cursor: 'pointer' }}
                                        >
                                          Cancel
                                        </button>
                                        <button 
                                          type="submit" 
                                          style={{ padding: '5px 15px', border: 'none', backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                          Save Course
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              )}

                              {/* EDIT SEMESTER HEADER MODAL */}
                              {editingTermBlock && (
                                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontFamily: 'Arial, sans-serif' }}>
                                  <div style={{ backgroundColor: '#ffffff', width: '400px', padding: '20px', borderRadius: '4px', border: '3px solid #005a82', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #005a82', paddingBottom: '10px', marginBottom: '15px' }}>
                                      <h3 style={{ margin: 0, color: '#005a82', fontSize: '13px', fontWeight: 'bold' }}>
                                        📅 Edit Semester Header
                                      </h3>
                                      <button onClick={() => setEditingTermBlock(null)} style={{ border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer', color: '#999' }}>&times;</button>
                                    </div>
                                    
                                    <form onSubmit={(e) => {
                                      e.preventDefault();
                                      const updated = [...terms];
                                      updated[editingTermBlock.termIdx].term = editingTermBlock.term;
                                      updated[editingTermBlock.termIdx].year = editingTermBlock.year;
                                      updated[editingTermBlock.termIdx].countPE = editingTermBlock.countPE;
                                      saveTermsToDb(updated);
                                      setEditingTermBlock(null);
                                    }}>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px' }}>
                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Semester Term Code (e.g. S25)</label>
                                          <input 
                                            type="text" 
                                            required
                                            value={editingTermBlock.term}
                                            onChange={(e) => setEditingTermBlock({ ...editingTermBlock, term: e.target.value })}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Year (e.g. 2025)</label>
                                          <input 
                                            type="text" 
                                            required
                                            value={editingTermBlock.year}
                                            onChange={(e) => setEditingTermBlock({ ...editingTermBlock, year: e.target.value })}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Count of P & E Course</label>
                                          <input 
                                            type="number" 
                                            required
                                            value={editingTermBlock.countPE}
                                            onChange={(e) => setEditingTermBlock({ ...editingTermBlock, countPE: parseInt(e.target.value, 10) || 0 })}
                                            style={{ width: '100%', padding: '6px', border: '1px solid #ccc' }}
                                          />
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                                        <button 
                                          type="button" 
                                          onClick={() => setEditingTermBlock(null)} 
                                          style={{ padding: '5px 12px', border: '1px solid #ccc', backgroundColor: '#f5f5f5', cursor: 'pointer' }}
                                        >
                                          Cancel
                                        </button>
                                        <button 
                                          type="submit" 
                                          style={{ padding: '5px 15px', border: 'none', backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              )}

                              <div style={{ marginTop: '15px', fontSize: '11px', lineHeight: '18px', color: '#333' }}>
                                <div style={{ color: '#0000FF' }}><b>R = Registered</b></div>
                                <div style={{ color: '#008000' }}><b>P = Passed</b></div>
                                <div style={{ color: '#FF0000' }}><b>F = Failed</b></div>
                                <div style={{ color: '#800080' }}><b>D = Drop</b></div>
                                <div style={{ color: '#0000FF' }}><b>W = Withdraw</b></div>
                                <div style={{ color: '#0000FF' }}><b>I = Incomplete</b></div>

                                <hr style={{ border: 'none', borderTop: '1px dashed #A89569', margin: '10px 0' }} />

                                <div style={{ fontWeight: 'bold', color: '#FF0000', marginBottom: '4px' }}>SPECIAL STATUS</div>
                                <div style={{ marginTop: '4px' }}>R = Normal Register ()</div>
                                <div style={{ color: '#FF0000' }}>FR = Repeat Failed <span style={{ color: '#333' }}>(طالب إعادة راسب)</span>- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#008000' }}>DR = Repeat Drained <span style={{ color: '#333' }}>(طالب إعادة مستنفذ)</span>- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#800080' }}>RA = Repeat Assignment <span style={{ color: '#333' }}>(طلاب إعادة مع إعادة الوظيفة)</span></div>
                                <div style={{ color: '#800080' }}>RE = Repeat No Assignment <span style={{ color: '#333' }}>(طالب إعادة مع الاحتفاظ بعلامة الوظيفة)</span>- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#0000FF' }}>FRF11 = Failed on Term F11 - Payment: Exam Fees Only <span style={{ color: '#333' }}>(طالب إعادة راسب لفصل خريف 2011 ممن دفعوا الرسم الامتحاني فقط)</span>- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#0000FF' }}>FRF13 = Failed on Term F13 - Payment: Exam Fees Only ()- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#0000FF' }}>FRS14 = Failed on Term S14 - Payment: Exam Fees Only ()- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#0000FF' }}>FRF14 = Failed on Term F14 - Payment: Exam Fees Only ()- <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading decision...'); }} style={{ color: '#0000FF', textDecoration: 'underline' }}>Download Decision</a></div>
                                <div style={{ color: '#0000FF' }}>FRS15 = Failed on Term S15 - Payment: Exam Fees Only ()</div>
                                <div style={{ color: '#0000FF' }}>FRF15 = Failed on Term F15 - Payment: Exam Fees Only ()</div>
                                <div style={{ color: '#0000FF' }}>FRS16 = Failed on Term S16 - Payment: Exam Fees Only ()</div>
                                <div style={{ color: '#0000FF' }}>FRF16 = Failed on Term F16 - Payment: Exam Fees Only ()</div>
                                <div style={{ color: '#0000FF' }}>FRS17 = Failed on Term S17 - Payment: Exam Fees Only ()</div>
                                <div style={{ color: '#FF0000' }}>F-GRE = Faild on Term S24 or F24 <span style={{ color: '#333' }}>(طالب خريج - تم التسجيل على المواد في فصل بعد فصل التخرج- يجب نقل فصل هذه المادة (وأيضا احتساب رسم المادة كرسم كامل)، حيث تم إعادة المواد في نفس فصل التخرج)</span></div>

                                <hr style={{ border: 'none', borderTop: '1px dashed #A89569', margin: '15px 0' }} />
                              </div>

                              <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #20639b', backgroundColor: '#f5f9fc' }}>
                                <div style={{ fontWeight: 'bold', color: '#005a82', marginBottom: '8px', borderBottom: '1px solid #20639b', paddingBottom: '4px' }}>
                                  Petitions &amp; Issues Requests — Requests new Issues
                                </div>
                                <table cellPadding={4} cellSpacing={0} width="100%" style={{ fontSize: '11px' }}>
                                  <tbody>
                                    <tr>
                                      <td width="20%" style={{ fontWeight: 'bold' }}>Petition Title:</td>
                                      <td><input type="text" style={{ width: '100%', padding: '3px', border: '1px solid #ccc' }} placeholder="Enter petition title..." /></td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold' }}>Department:</td>
                                      <td>
                                        <select style={{ width: '100%', padding: '3px', border: '1px solid #ccc' }}>
                                          <option>Academic Affairs</option>
                                          <option>Student Affairs</option>
                                          <option>Financial Affairs</option>
                                          <option>Technical Support</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold' }}>Attachment:</td>
                                      <td><input type="file" style={{ fontSize: '11px' }} /> <span>لم يتمّ اختيار أيّ ملفّ</span></td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold' }} valign="top">Description:</td>
                                      <td><textarea style={{ width: '100%', height: '80px', padding: '4px', border: '1px solid #ccc' }} placeholder="Write your petition or issue details here..."></textarea></td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td>
                                        <button onClick={() => alert('تم إرسال الطلب بنجاح')} style={{ backgroundColor: '#005a82', color: '#fff', padding: '6px 15px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                                          Submit Request
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>


                            </div>
                          )}

                          {/* TAB 2: std_current_average.php */}
                          {activeTab === 'average' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📊 المعدل الفصلي والتراكمي (Student Current Average - std_current_average.php)
                              </div>

                              <table cellSpacing={1} cellPadding={6} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #A8CADC', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F4F4F4' }}>
                                    <td width="30%"><b>المعدل التراكمي العام (GPA):</b></td>
                                    <td width="70%" style={{ fontSize: '14px', fontWeight: 'bold', color: '#005a82' }}>88.57 % (امتياز)</td>
                                  </tr>
                                  <tr>
                                    <td><b>الساعات المنجزة (Completed Credits):</b></td>
                                    <td style={{ fontWeight: 'bold' }}>124 / 140 ساعة معتمدة</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F4F4F4' }}>
                                    <td><b>معدل فصل الخريف F24:</b></td>
                                    <td style={{ color: '#0077FF', fontWeight: 'bold' }}>87.50 %</td>
                                  </tr>
                                  <tr>
                                    <td><b>معدل فصل الربيع S24:</b></td>
                                    <td style={{ color: '#0077FF', fontWeight: 'bold' }}>88.00 %</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F4F4F4' }}>
                                    <td><b>معدل فصل الخريف F23:</b></td>
                                    <td style={{ color: '#0077FF', fontWeight: 'bold' }}>90.00 %</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 3: std_classes.php */}
                          {activeTab === 'classes' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🏫 الصفوف الافتراضية والمقررات المسجلة (My Virtual Classes - std_classes.php)
                              </div>

                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رمز المقرر</td>
                                    <td style={{ textAlign: 'right' }}>اسم المقرر</td>
                                    <td>رقم الصف (Class)</td>
                                    <td>المدرس (Tutor)</td>
                                    <td>توقيت الجلسة (Class Time)</td>
                                    <td>رابط الجلسة</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td><b>WEB</b></td>
                                    <td style={{ textAlign: 'right' }}>تقانات الويب والتطبيقات</td>
                                    <td>C1</td>
                                    <td>د. محمد أحمد</td>
                                    <td>الأحد 08:00 PM</td>
                                    <td><a href="https://lms.svuonline.org" target="_blank" rel="noreferrer" style={{ color: '#0066FF' }}>دخول الصف</a></td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                                    <td><b>SEC</b></td>
                                    <td style={{ textAlign: 'right' }}>أمن المعلومات والشبكات</td>
                                    <td>C2</td>
                                    <td>د. سامر حسن</td>
                                    <td>الثلاثاء 06:00 PM</td>
                                    <td><a href="https://lms.svuonline.org" target="_blank" rel="noreferrer" style={{ color: '#0066FF' }}>دخول الصف</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 4: exam_calendar.php */}
                          {activeTab === 'exams' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📅 برنامج الامتحانات الفاصلة (Exam Calendar - exam_calendar.php)
                              </div>

                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #20639b', backgroundColor: '#ffffff', fontSize: '11px', textAlign: 'center' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold' }}>
                                    <td>المقرر</td>
                                    <td>الفصل</td>
                                    <td>التاريخ</td>
                                    <td>التوقيت</td>
                                    <td>المركز الامتحان</td>
                                    <td>القاعة والمقعد</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F7F7F7' }}>
                                    <td><b>WEB - تقانات الويب</b></td>
                                    <td>S25</td>
                                    <td>2026-10-18</td>
                                    <td>12:30 PM - 02:30 PM</td>
                                    <td>مركز المزة - دمشق</td>
                                    <td>Lab 1 / Desk 08</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff' }}>
                                    <td><b>SEC - أمن المعلومات</b></td>
                                    <td>S25</td>
                                    <td>2026-10-15</td>
                                    <td>10:00 AM - 12:00 PM</td>
                                    <td>مركز المزة - دمشق</td>
                                    <td>Lab 3 / Desk 14</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 5: student_payments.php */}
                          {activeTab === 'payments' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                💳 كشف الحساب والمدفوعات المالية (Student Payments - student_payments.php)
                              </div>

                              <table cellSpacing={1} cellPadding={5} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #A8CADC', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رقم الإيصال</td>
                                    <td>التاريخ</td>
                                    <td>البيان / السبب</td>
                                    <td>المبلغ (SYP)</td>
                                    <td>حالة الدفع</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td>REC-98231</td>
                                    <td>2025-10-01</td>
                                    <td>رسم تسجيل مقررات فصل F25</td>
                                    <td>450,000</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مدفوع (Paid)</td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                                    <td>REC-81204</td>
                                    <td>2025-03-10</td>
                                    <td>رسم تسجيل مقررات فصل S24</td>
                                    <td>380,000</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مدفوع (Paid)</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 6: timeSearch */}
                          {activeTab === 'timeSearch' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🔍 استعلام مواعيد الامتحانات بالرقم الجامعي (course_time_tutor.php)
                              </div>

                              <form onSubmit={handleGetTime}>
                                <table cellSpacing={0} cellPadding={4} width="100%" style={{ backgroundColor: '#EFEFEF', border: '1px solid #C0C0C0' }}>
                                  <tbody>
                                    <tr>
                                      <td width="20%"><b>Student Id:</b></td>
                                      <td width="60%">
                                        <input 
                                          type="text" 
                                          value={studentIdInput} 
                                          onChange={(e) => setStudentIdInput(e.target.value)}
                                          style={{ width: '80%', padding: '3px', border: '1px solid #a69448' }}
                                          placeholder="116823"
                                        />
                                      </td>
                                      <td width="20%"><b>:الرقم الجامعي</b></td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3} align="center">
                                        <button type="submit" style={{ backgroundColor: '#005a82', color: 'white', border: 'none', padding: '4px 15px', fontWeight: 'bold', cursor: 'pointer' }}>
                                          {searchLoading ? 'Sending...' : 'Get Time'}
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>

                              {searchResults && (
                                <table width="100%" border={1} cellPadding={4} style={{ marginTop: '10px', borderCollapse: 'collapse', borderColor: '#20639b', fontSize: '11px', textAlign: 'center' }}>
                                  <thead>
                                    <tr style={{ backgroundColor: '#005a82', color: 'white' }}>
                                      <td>رمز المقرر</td>
                                      <td>اسم المقرر</td>
                                      <td>الفصل</td>
                                      <td>التاريخ</td>
                                      <td>التوقيت</td>
                                      <td>المركز</td>
                                      <td>القاعة/المقعد</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {searchResults.map((r, i) => (
                                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#F7F7F7' : '#ffffff' }}>
                                        <td><b>{r.code}</b></td>
                                        <td>{r.name}</td>
                                        <td>{r.term}</td>
                                        <td>{r.date}</td>
                                        <td>{r.time}</td>
                                        <td>{r.center}</td>
                                        <td>{r.seat}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                          {/* TAB 7: oldReg */}
                          {activeTab === 'oldReg' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📝 التسجيل للطلاب القدامى (Registration for Old Students - old_std_reg.php)
                              </div>
                              <div style={{ padding: '10px', border: '1px solid #FEB8AE', backgroundColor: '#FFF3EF', fontSize: '11px', marginBottom: '10px' }}>
                                <b>بيانات تسجيل الطالب:</b> حيدرة يعقوب القاضي (116823)<br />
                                <b>الفصل الأكاديمي الحاضر:</b> S25<br />
                                <b>الحالة الأكاديمية:</b> مسجل / فعال (Active Registered)<br />
                                <b>عدد المقررات المسجلة بالفصل:</b> 3 مقررات (Law BL, Economics BSCE, Mass Comm BMC)
                              </div>
                              <table cellSpacing={1} cellPadding={4} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رمز البرنامج</td>
                                    <td>اسم البرنامج الأكاديمي</td>
                                    <td>الدرجة العلميّة</td>
                                    <td>حالة التسجيل</td>
                                    <td>الرسوم الإجمالية</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td><b>BL</b></td>
                                    <td>الإجازة في الحقوق (Bachelor of Law)</td>
                                    <td>إجازة جامعية</td>
                                    <td style={{ color: 'blue', fontWeight: 'bold' }}>مؤكد (Registered)</td>
                                    <td>145,000 SYP</td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                                    <td><b>BSCE</b></td>
                                    <td>الإجازة في الاقتصاد (Bachelor in Economics)</td>
                                    <td>إجازة جامعية</td>
                                    <td style={{ color: 'orange', fontWeight: 'bold' }}>مشروط (Conditional)</td>
                                    <td>120,000 SYP</td>
                                  </tr>
                                  <tr style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>
                                    <td><b>BMC</b></td>
                                    <td>الإجازة في الإعلام (Bachelor in Mass Communication)</td>
                                    <td>إجازة جامعية</td>
                                    <td style={{ color: 'orange', fontWeight: 'bold' }}>مشروط (Conditional)</td>
                                    <td>120,000 SYP</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 8: placement */}
                          {activeTab === 'placement' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                ✏️ اختبار تحديد المستوى (Placement Test Registration - pt_std_courses.php)
                              </div>
                              <div style={{ padding: '10px', border: '1px solid #A8CADC', backgroundColor: '#F9F9F9', fontSize: '11px', lineHeight: '20px' }}>
                                <b>اسم الطالب:</b> haydaraa alkadi (116823)<br />
                                <b>اختبار تحديد المستوى في اللغة الإنكليزية (English Placement Test):</b> معفى / مستوفى بنجاح<br />
                                <b>اختبار مهارات الحاسوب (ICDL / Computer Skills Test):</b> ناجح<br />
                                <b>مركز الامتحان المعين:</b> دمشق - المزة (Damascus - Mezzeh Exam Center)<br />
                                <b>حالة الطلب:</b> مكتمل ومثبت برقم المرجعية <b>PT-116823-2026</b>
                              </div>
                            </div>
                          )}

                          {/* TAB 9: military */}
                          {activeTab === 'military' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🪖 رفع وحالة شعبة التجنيد (Upload Military Document - update_documentMilitary_st.php)
                              </div>
                              <table cellSpacing={0} cellPadding={6} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px', backgroundColor: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '25%' }}>شعبة التجنيد</td>
                                    <td>شعبة تجنيد اللاذقية</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>حالة التأجيل الدراسية</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مؤجل بدواعي الدراسة لعام 2026/2027</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>اسم الوثيقة المرفوعة</td>
                                    <td>
                                      <a href="#photo" onClick={(e) => { e.preventDefault(); setPhotoModalOpen(true); }} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_Military_116823.jpg
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>تاريخ الاعتماد من المنسق</td>
                                    <td>2026-01-10 10:15:00 (تم التدقيق والتصديق)</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 10: naqaba */}
                          {activeTab === 'naqaba' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📜 رفع وثيقة النقابة (Upload Naqaba File - update_documentNaqaba_st.php)
                              </div>
                              <table cellSpacing={0} cellPadding={6} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px', backgroundColor: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '25%' }}>جهة النقابة / الهيئة</td>
                                    <td>نقابة المحامين / الحقوقيين في سوريا</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>الحالة والاعتماد</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>مصدق ومقبول (Verified)</td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>الملف المرفوع</td>
                                    <td>
                                      <a href="#photo" onClick={(e) => { e.preventDefault(); setPhotoModalOpen(true); }} style={{ color: '#0066FF', fontWeight: 'bold' }}>
                                        upload_Naqaba_116823.jpg
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 11: changePass */}
                          {activeTab === 'changePass' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                🔐 تغيير كلمة المرور (Change Password - reset_password.php)
                              </div>
                              <form onSubmit={(e) => { e.preventDefault(); alert('تم تحديث كلمة المرور بنجاح للمستخدم haydaraa_116823'); }}>
                                <table cellSpacing={0} cellPadding={6} width="100%" style={{ backgroundColor: '#F9F9F9', border: '1px solid #C0C0C0', fontSize: '11px' }}>
                                  <tbody>
                                    <tr>
                                      <td width="25%"><b>Current Password:</b></td>
                                      <td><input type="password" defaultValue="06200083193" style={{ border: '1px solid #7F9DB9', padding: '2px 5px', width: '180px' }} /></td>
                                    </tr>
                                    <tr>
                                      <td><b>New Password:</b></td>
                                      <td><input type="password" placeholder="••••••••" style={{ border: '1px solid #7F9DB9', padding: '2px 5px', width: '180px' }} /></td>
                                    </tr>
                                    <tr>
                                      <td><b>Confirm New Password:</b></td>
                                      <td><input type="password" placeholder="••••••••" style={{ border: '1px solid #7F9DB9', padding: '2px 5px', width: '180px' }} /></td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2} align="center" style={{ paddingTop: '10px' }}>
                                        <button type="submit" style={{ backgroundColor: '#005a82', color: '#ffffff', border: 'none', padding: '4px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
                                          Update Password
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>
                            </div>
                          )}

                          {/* TAB 12: updateReg */}
                          {activeTab === 'updateReg' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                ⚙️ تحديث بيانات التسجيل (Update Student Registration - sa_app_reg_auth.php)
                              </div>
                              <table cellSpacing={0} cellPadding={6} width="100%" border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', fontSize: '11px', backgroundColor: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold', width: '25%' }}>رقم الهاتف المحمول</td>
                                    <td><input type="text" defaultValue="0991187851" style={{ width: '200px', border: '1px solid #ccc', padding: '2px' }} /></td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>البريد الإلكتروني</td>
                                    <td><input type="text" defaultValue="haydaraa554@gmail.com" style={{ width: '250px', border: '1px solid #ccc', padding: '2px' }} /></td>
                                  </tr>
                                  <tr>
                                    <td style={{ backgroundColor: '#FEF9DF', fontWeight: 'bold' }}>العنوان السكني</td>
                                    <td><input type="text" defaultValue="اللاذقية - جبلة" style={{ width: '300px', border: '1px solid #ccc', padding: '2px' }} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} align="center" style={{ backgroundColor: '#F9F9F9' }}>
                                      <button onClick={() => alert('تم حفظ البيانات وتعديلها بنجاح')} style={{ backgroundColor: '#005a82', color: '#ffffff', border: 'none', padding: '4px 15px', fontWeight: 'bold', cursor: 'pointer' }}>
                                        تحديث البيانات
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 13: chooseSpec */}
                          {activeTab === 'chooseSpec' && (
                            <div>
                              <div style={{ 
                                color: '#8a7d3b', 
                                fontWeight: 'bold', 
                                fontSize: '12px', 
                                fontFamily: 'Tahoma, Arial, sans-serif',
                                marginTop: '4px'
                              }}>
                                No Specializations in Your Program or You can't choose it by yourself
                              </div>
                            </div>
                          )}

                          {/* TAB 14: calendar */}
                          {activeTab === 'calendar' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '8px' }}>
                                📅 التقويم الجامعي السنوي (SVU Academic Year Calendar 2026/2027)
                              </div>
                              <table cellSpacing={1} cellPadding={6} width="100%" style={{ borderCollapse: 'collapse', border: '1px solid #ECE6C4', backgroundColor: '#ffffff', fontSize: '11px' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>الحدث الأكاديمي</td>
                                    <td>تاريخ البدء</td>
                                    <td>تاريخ الانتهاء</td>
                                    <td>الملاحظات</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td style={{ textAlign: 'right' }}><b>التسجيل واختيار المقررات (S25)</b></td>
                                    <td>2026-09-01</td>
                                    <td>2026-09-25</td>
                                    <td>مستمر</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#ffffff', textAlign: 'center' }}>
                                    <td style={{ textAlign: 'right' }}><b>بدء المحاضرات والصفوف الافتراضية</b></td>
                                    <td>2026-10-01</td>
                                    <td>2027-01-15</td>
                                    <td>عبر منصة SVU LMS</td>
                                  </tr>
                                  <tr style={{ backgroundColor: '#F7F7F7', textAlign: 'center' }}>
                                    <td style={{ textAlign: 'right' }}><b>امتحانات الفصل الدراسي النهائي</b></td>
                                    <td>2027-02-01</td>
                                    <td>2027-02-28</td>
                                    <td>المراكز الامتحانية المعتمدة</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* TAB 15: lectureTutor */}
                          {activeTab === 'lectureTutor' && (
                            <div>
                              <div style={{ backgroundColor: '#FEF9DF', border: '1px solid #ECE6C4', padding: '6px', fontWeight: 'bold', color: '#6f7b79', marginBottom: '12px', fontSize: '12px' }}>
                                🏫 أوقات المحاضرات والصفوف الافتراضية للمقررات الدراسية (Lecture & Tutor time - course_time_tutor.php)
                              </div>

                              <table cellSpacing={0} cellPadding={6} width="98%" align="center" border={0} style={{ backgroundColor: '#EFEFEF', border: '1px solid #C0C0C0', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '15px', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                                <tbody>
                                  <tr>
                                    <td colSpan={2} style={{ height: '10px' }}></td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#3a618c', textAlign: 'right', width: '25%' }}>Term</td>
                                    <td style={{ padding: '8px', textAlign: 'left' }}>
                                      <select 
                                        value={selectedLtTerm} 
                                        onChange={(e) => setSelectedLtTerm(e.target.value)} 
                                        style={{ width: '350px', padding: '3px', border: '1px solid #a69448', fontSize: '11px' }}
                                      >
                                        <option value="49">F25</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#3a618c', textAlign: 'right' }}>Program</td>
                                    <td style={{ padding: '8px', textAlign: 'left' }}>
                                      <select 
                                        value={selectedLtProgram} 
                                        onChange={(e) => {
                                          setSelectedLtProgram(e.target.value);
                                          setSelectedLtCourse("-1");
                                          setSelectedLtDay("-1");
                                          setSelectedLtTutor("-1");
                                        }} 
                                        style={{ width: '350px', padding: '3px', border: '1px solid #a69448', fontSize: '11px' }}
                                      >
                                        <option value="-1">»» Select Program</option>
                                        {programsList.map(prog => (
                                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#3a618c', textAlign: 'right' }}>Course</td>
                                    <td style={{ padding: '8px', textAlign: 'left' }}>
                                      <select 
                                        value={selectedLtCourse} 
                                        onChange={(e) => {
                                          setSelectedLtCourse(e.target.value);
                                          setSelectedLtDay("-1");
                                          setSelectedLtTutor("-1");
                                        }} 
                                        style={{ width: '350px', padding: '3px', border: '1px solid #a69448', fontSize: '11px' }}
                                        disabled={selectedLtProgram === "-1"}
                                      >
                                        <option value="-1">»» Select Course</option>
                                        {availableLtCourses.map(course => (
                                          <option key={course.id} value={course.id}>{course.code} | {course.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#3a618c', textAlign: 'right' }}>Day</td>
                                    <td style={{ padding: '8px', textAlign: 'left' }}>
                                      <select 
                                        value={selectedLtDay} 
                                        onChange={(e) => {
                                          setSelectedLtDay(e.target.value);
                                          setSelectedLtTutor("-1");
                                        }} 
                                        style={{ width: '350px', padding: '3px', border: '1px solid #a69448', fontSize: '11px' }}
                                        disabled={selectedLtProgram === "-1"}
                                      >
                                        <option value="-1">»» Select Day</option>
                                        <option value="1">Saturday</option>
                                        <option value="2">Sunday</option>
                                        <option value="3">Monday</option>
                                        <option value="4">Tuesday</option>
                                        <option value="5">Wednesday</option>
                                        <option value="6">Thursday</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#3a618c', textAlign: 'right' }}>Tutor</td>
                                    <td style={{ padding: '8px', textAlign: 'left' }}>
                                      <select 
                                        value={selectedLtTutor} 
                                        onChange={(e) => setSelectedLtTutor(e.target.value)} 
                                        style={{ width: '350px', padding: '3px', border: '1px solid #a69448', fontSize: '11px' }}
                                        disabled={selectedLtProgram === "-1"}
                                      >
                                        <option value="-1">»» Select Tutor</option>
                                        {availableLtTutors.map(tutor => (
                                          <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{ height: '10px' }}></td>
                                  </tr>
                                </tbody>
                              </table>

                              <table id="TableResult" width="98%" align="center" border={1} cellSpacing={0} cellPadding={5} style={{ borderCollapse: 'collapse', border: '1px solid #D5D5D5', fontSize: '11px', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#005a82', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                    <td>رمز المقرر</td>
                                    <td style={{ textAlign: 'right' }}>اسم المقرر</td>
                                    <td>الصف (Class)</td>
                                    <td>المدرس (Tutor)</td>
                                    <td>اليوم (Day)</td>
                                    <td>التوقيت (Time)</td>
                                    <td>القاعة (Room)</td>
                                    <td>رابط الجلسة</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedLtProgram === "-1" ? (
                                    <tr>
                                      <td colSpan={8} align="center" style={{ padding: '20px', color: '#666', fontStyle: 'italic' }}>
                                        يرجى تحديد البرنامج الأكاديمي أولاً لعرض التوقيتات / Please select an academic program to view schedules
                                      </td>
                                    </tr>
                                  ) : filteredLtSchedules.length === 0 ? (
                                    <tr>
                                      <td colSpan={8} align="center" style={{ padding: '20px', color: 'red', fontWeight: 'bold' }}>
                                        لا يوجد نتائج تطابق البحث المختار / No schedule results matching selection
                                      </td>
                                    </tr>
                                  ) : (
                                    filteredLtSchedules.map((item, idx) => (
                                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#F7F7F7' : '#ffffff', textAlign: 'center' }}>
                                        <td><b>{item.courseCode}</b></td>
                                        <td style={{ textAlign: 'right' }}>{item.courseName}</td>
                                        <td><span style={{ backgroundColor: '#E1F5FE', padding: '2px 6px', borderRadius: '4px', border: '1px solid #B3E5FC', fontWeight: 'bold', color: '#0288D1' }}>{item.className}</span></td>
                                        <td><b>{item.tutorName}</b></td>
                                        <td>{item.dayName}</td>
                                        <td dir="ltr" style={{ color: '#E65100', fontWeight: 'bold' }}>{item.time}</td>
                                        <td>{item.room}</td>
                                        <td>
                                          <a 
                                            href="https://lms.svuonline.org" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            style={{ color: '#0066FF', textDecoration: 'underline', fontWeight: 'bold' }}
                                          >
                                            دخول المحاضرة
                                          </a>
                                        </td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer */}
              <table cellSpacing={0} cellPadding={0} width="100%" align="center" border={0} style={{ marginTop: '20px' }}>
                <tbody>
                  <tr style={{ backgroundColor: '#6f7b79', height: '2px' }}>
                    <td></td>
                  </tr>
                  <tr>
                    <td height="30" align="center" style={{ fontFamily: 'Trebuchet MS, Verdana, Tahoma', fontSize: '11px', color: '#555555' }}>
                      Copyright © 2011-2026, Syrian Virtual University (SVU) All rights reserved.<br />
                      <small style={{ color: '#0066CC', fontSize: '10px' }}>Powered by SVU Information System (SVUIS)</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="3%" style={{ backgroundColor: '#ffffff' }} height="108">&nbsp;</td>
          </tr>
        </tbody>
      </table>
      {/* Photo Preview Modal Popup */}
      {photoModalOpen && (
        <div 
          onClick={() => setPhotoModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              border: '3px solid #005a82',
              borderRadius: '6px',
              padding: '15px',
              maxWidth: '450px',
              width: '90%',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              textAlign: 'center',
              direction: 'rtl'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #005a82', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#005a82', fontSize: '13px' }}>
                📷 الصورة الشخصية للطالب - حيدرة القاضي (116823)
              </span>
              <button 
                onClick={() => setPhotoModalOpen(false)}
                style={{
                  backgroundColor: '#cc0000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✖ إغلاق
              </button>
            </div>

            <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #ECE6C4', padding: '10px', borderRadius: '4px', display: 'inline-block' }}>
              <img 
                src={studentPhoto} 
                alt="الصورة الشخصية" 
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '420px', borderRadius: '3px', border: '1px solid #A8CADC' }} 
              />
            </div>

            <div style={{ marginTop: '12px', fontSize: '11px', color: '#555555' }}>
              <b>الاسم:</b> حيدرة يعقوب القاضي | <b>اسم المستخدم:</b> haydaraa_116823<br />
              <b>الرقم الجامعي:</b> 116823 | <b>حالة الصورة:</b> مصدقة ومقبولة رسمياً
            </div>

            <button 
              onClick={() => setPhotoModalOpen(false)}
              style={{
                marginTop: '12px',
                backgroundColor: '#005a82',
                color: '#ffffff',
                border: 'none',
                padding: '5px 20px',
                fontWeight: 'bold',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              موافق / تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}