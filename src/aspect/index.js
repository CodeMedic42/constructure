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
import registerAspect from './register-aspect';
import uniqueAspect from './unique-aspect';
import divisibleAspect from './divisible-aspect';
import enumAspect from './enum-aspect';
import typeAspect from './type-aspect';

const createAspect = (id, value, options) => {
    return new Aspect(id, value, options);
};

createAspect.required = requiredAspect;
createAspect.maxLength = maxLengthAspect;
createAspect.max = maxAspect;
createAspect.minLength = minLengthAspect;
createAspect.min = minAspect;
createAspect.validDate = validDateAspect;
createAspect.minDate = minDateAspect;
createAspect.maxDate = maxDateAspect;
createAspect.pattern = patternAspect;
createAspect.emailPattern = emailPatternAspect;
createAspect.exactLength = exactLengthAspect;
createAspect.register = registerAspect;
createAspect.unique = uniqueAspect;
createAspect.divisible = divisibleAspect;
createAspect.enum = enumAspect;
createAspect.type = typeAspect;

export default createAspect;
