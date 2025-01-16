"use client";

import { useState } from "react";
import data from "../plot/plot.json";
import PureInfo from "../components/PureInfo";
import InputComponent from "../components/Input/Input";
import Graph from "../components/Graph";
import TestWithImgs from "../components/TestWithImgs";
import Debugger from "../components/Debugger";
import TestMultiSelect from "../components/TestMultiSelect";
import TestRadioBtns from "../components/TestRadioBtns/TestRadioBtns";
import TestRatingScale from "../components/TestRatingScale";
import GraphSecond from "../components/GraphSecond";
import PureInfoSecond from "../components/PureIfoSecond";
import UploadInfo from "../components/UploadInfo";
import Summaries from "../components/Summaries/Summaries";
import Form from "../components/Form";
import Payment from "../components/Payment";
import ProgressBar from "../components/ProgressBar";

export default function Tilomaker() {
  const [formData, setFormData] = useState({});

  const [currentScreen, setCurrentScreen] = useState(1);

  const totalScreens = 31;

  const componentMap = {
    PureInfo: PureInfo,
    PureInfoSecond: PureInfoSecond,
    Input: InputComponent,
    Graph: Graph,
    GraphSecond: GraphSecond,
    TestWithImgs: TestWithImgs,
    TestMultiSelect: TestMultiSelect,
    TestRadioBtns: TestRadioBtns,
    TestRatingScale: TestRatingScale,
    UploadInfo: UploadInfo,
    Summaries: Summaries,
    Form: Form,
    // Payment: Payment,
  };

  const screenData = data[currentScreen];
  const ComponentToRender = componentMap[screenData.type] || PureInfo;

  const handleNext = () => {
    if (currentScreen < data.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // console.log("Данные формы:", formData);

  return (
    <main className="h-screen w-screen outline-none flex flex-col justify-between pt-12 pb-8 px-10 bg-customLightYellow max-w-[400px] mx-auto overflow-y-auto">
      {currentScreen >= 1 && currentScreen <= 30 && (
        <ProgressBar
          currentScreen={currentScreen}
          totalScreens={totalScreens}
        />
      )}
      {ComponentToRender ? (
        <ComponentToRender
          key={currentScreen}
          {...screenData}
          onNext={handleNext}
          onFormDataChange={handleFormDataChange}
          formData={formData}
        />
      ) : (
        <p>Компонент не найден</p>
      )}
      {/* <Debugger
        currentScreen={currentScreen}
        formData={formData}
        onNext={handleNext}
        onPrev={handlePrev}
      /> */}
    </main>
  );
}
