import React, {useState, useMemo, useCallback} from 'react'
import { CreatorSteps } from '@utils/entity/MinterWizard';

export default function useMinterWizard(
  steps: CreatorSteps
) {
  const [creatorStep, setCreatorStep] = useState(0);

  const isFirstScreen = useMemo(() => (
    steps && creatorStep === steps[0]?.creatorStep
  ), [creatorStep, steps])

  const isLastScreen = useMemo(() => (
    steps && creatorStep === steps[steps?.length-1]?.creatorStep
  ), [creatorStep, steps])

  const handleCreatorNextButton = useCallback((e)=>{
    e.preventDefault();
    return !isLastScreen && setCreatorStep(prev => prev + 1)
  },[setCreatorStep, isLastScreen])

  const handleCreatorPrevButton = useCallback(() => (
    !isFirstScreen && setCreatorStep(prev => prev - 1)
  ), [setCreatorStep, isFirstScreen])

  const renderMinterWizardScreen = useCallback((creatorStep: number) => {
    const Component = steps[creatorStep]?.Component;
    if(Component !== undefined){
      return <Component />;
    }

    return null
  }, [steps])


  return {
    creatorStep,
    setCreatorStep,
    isFirstScreen,
    isLastScreen,
    handleCreatorNextButton,
    handleCreatorPrevButton,
    renderMinterWizardScreen,
  }
}

