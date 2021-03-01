import Aspect from './aspect';
import requiredAspect from './required-aspect';
import maxLengthAspect from './max-length-aspect';
import maxAspect from './max-aspect';
import minLengthAspect from './min-length-aspect';
import minAspect from './min-aspect';
import validDateAspect from './valid-date-aspect';
import minDateAspect from './min-date-aspect';
import maxDateAspect from './max-date-aspect';
import patternAspect from './pattern-aspect';
import emailPatternAspect from './email-pattern-aspect';
import exactLengthAspect from './exact-length-aspect';

const createAspect = (aspectValue) => {
    return new Aspect(aspectValue);
};

createAspect.required = requiredAspect;
createAspect.maxLength = maxLengthAspect;
createAspect.max = maxAspect;
createAspect.minLength = minLengthAspect;
createAspect.min = minAspect;
createAspect.validDate = validDateAspect;
createAspect.minDate = minDateAspect;
createAspect.maxDate = maxDateAspect;
createAspect.patternDate = patternAspect;
createAspect.emailPattern = emailPatternAspect;
createAspect.exactLength = exactLengthAspect;


export default createAspect;
