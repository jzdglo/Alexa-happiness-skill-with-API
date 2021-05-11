const welcome = require('./template/welcome.json');
const welcome_data = require('./data/welcome.json');
const happy = require('./template/happy.json');
const happy_data = require('./data/happy.json');
const neither = require('./template/neither.json');
const neither_data = require('./data/neither.json');
const unhappy = require('./template/unhappy.json');
const unhappy_data = require('./data/unhappy.json');
const video = require('./template/video.json');
const video_data = require('./data/video.json');
const anothersug = require('./template/othersug.json');
const anothersug_data = require('./data/othersug.json');
const anothersug2 = require('./template/othersug2.json');
const anothersug_data2 = require('./data/othersug2.json');
const trySomething = require('./template/trysomething.json');
const trySomething_data = require('./data/trysomething.json');
const Alexa = require('ask-sdk-core');

const welcomeMessage = [
  "Hello! Welcome to Your Happiness. How happy are you feeling today? ",
  "Hi! Welcome to Your Happiness! Are you feeling happy today?",
  "Hi! Welcome to Your Happiness. How happy are you feeling today? ",
  "Hello! Welcome to Your Happiness! Are you feeling happy today?"
];

const methodsNum = [
  "The NHS suggest that getting enough sleep can help you be happier, more in control, and able to cope better with life's ups and downs. Around 7 to 8 hours is the average amount of sleep an adult needs for their body and mind to fully rest, but some need more and some less. What matters is that you find out how much sleep you need and then try to achieve it. Would you like to hear another NHS happiness tip?",
  "The NHS says that doing things that you enjoy is good for your emotional wellbeing. Simple activities like watching sports with a friend, having a soak in the bath or meeting up with friends for coffee can all improve your day. Doing something you're good at, such as cooking or dancing, is a good way to enjoy yourself and have a sense of achievement. Would you like to hear another NHS happiness tip?",
  "Do some exercise. The NHS says that \"Even moderate exercise releases chemicals in your brain that lift your mood. It can help you sleep better, have more energy and keep your heart healthy. Choose an exercise that you enjoy. If it helps, do it with a friend or listen to music. Adults should aim for 150 minutes a week. Would you like to hear another NHS happiness tip?",
  "Choose a well-balanced diet. According to the NHS, making healthy choices about your diet can make you feel emotionally stronger. You're doing something positive for yourself, which lifts your self-esteem. A good diet helps your brain and body work efficiently, too. Would you like to hear another NHS happiness tip?",
  "According to NHS, resilience is what allows you to cope with life's ups and downs. Making something worthwhile out of painful times helps your resilience grow. Starting a support group to help others, or making something creative out of bad experiences by, for example, writing, painting or singing, can help you express pain and get through hard times. Would you like to hear another NHS happiness tip?"
];

const tipNum = [
  "According to the \'Healthline\', people tend to smile when they are happy. But it’s actually a two-way street. That doesn’t mean you have to go around with a fake smile plastered on your face all the time. But the next time you find yourself feeling low, crack a smile and see what happens. Would you like to hear another tip?",
  "The \'Healthline\' suggests that some food can affect your state of mind. For example, swap a big, sweet breakfast pastry for some Greek yogurt with fruit. You’ll still satisfy your sweet tooth, and the protein will help you avoid a mid-morning energy crash. Try adding in a new food swap each week. Would you like to hear another tip?",
  "The \'Healthline\' says that simply being grateful can give your mood a big boost, among other benefits. Start each day by acknowledging one thing you’re grateful for. You can do this while you’re brushing your teeth or just waiting for that snoozed alarm to go off. Would you like to hear another tip?",
  "According to Harvard Health, deep breathing exercises can help reduce stress. If you’re having a hard time taking slow, deliberate breaths, try counting to 5 in your head with each inhale and exhale. Would you like to hear another tip?",
  "The \'Healthline\' says that a positive attitude is generally a good thing, but bad things happen to everyone. It’s just part of life. Acknowledge the feeling of unhappiness, letting yourself experience it for a moment. Then, shift your focus toward what made you feel this way and what it might take to recover. Would you like to hear another tip? "
];

const BACKGROUND_IMAGE_URL = 'https://s3.amazonaws.com/cdn.dabblelab.com/img/echo-show-bg-blue.png',
  VIDEO_URL = 'https://www.youtube.com/watch?v=kFhG-ZzLNN4&t=1390s&ab_channel=YogaWithAdriene',
  VIDEO_TITLE = "Slow and Gentle Yoga",
  VIDEO_SUBTITLE = "Yoga For Seniors ",
  TITLE = 'Yoga Video',
  TEXT = `In this tutorial, you'll learn how to relieve stress, cultivate a clear mind and a strong body.`;


// const LaunchRequestHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
//   },
//   async handle(handlerInput) {
//     const { serviceClientFactory, responseBuilder } = handlerInput;
//     try {
//       const upsServiceClient = serviceClientFactory.getUpsServiceClient();
//       const profileName = await upsServiceClient.getProfileName();
//       const speakOutput = `Hello ${profileName}! ${randomChoice(welcomeMessage)} Please give a scale of one to three, where one means unhappy and three means happy.`;
//       const repromptText = 'Please give a scale of one to three to rate your happiness while one means unhappy and three means happy.';
//       const attributes = handlerInput.attributesManager.getSessionAttributes();
//       attributes.lastResult = speakOutput;
//       handlerInput.attributesManager.setSessionAttributes(attributes);
      
//       return handlerInput.responseBuilder
//         .speak(speakOutput)
//         .reprompt(repromptText)
//         .addDirective({
//           type: 'Alexa.Presentation.APL.RenderDocument',
//           version: '1.0',
//           document: welcome,
//           datasources: welcome_data
//         })
//         .getResponse();
//     } catch (error) {
//       console.log(JSON.stringify(error));
//       if (error.statusCode == 403) {
//         return responseBuilder
//         .speak(messages.NOTIFY_MISSING_PERMISSIONS)
//         .withAskForPermissionsConsentCard([FULL_NAME_PERMISSION])
//         .getResponse();
//       }
//       console.log(JSON.stringify(error));
//       const response = responseBuilder.speak(messages.ERROR).getResponse();
//       // console.log(`Error handled: ${error.statusCode}`);
//       return response;
//     }
//   },
// };

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = `${randomChoice(welcomeMessage)} Please give a scale of one to three, where one means unhappy and three means happy.`;
      const repromptText = 'Please give a scale of one to three to rate your happiness while one means unhappy and three means happy.';
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: welcome,
          datasources: welcome_data
        })
        .getResponse();
    }else{
      const speakOutput = `${randomChoice(welcomeMessage)} Please give a scale of one to three, where one means unhappy and three means happy.`;
      const repromptText = 'Please give a scale of one to three to rate your happiness while one means unhappy and three means happy.';
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText)
        .getResponse();
    }
  }
};

const HappyButtonIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'happiness_scale_three';
  },
  handle(handlerInput) {
    return HappyHandler.handle(handlerInput);
  }
};

const NeitherButtonIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'happiness_scale_two';
  },
  handle(handlerInput) {
    return NeitherHandler.handle(handlerInput);
  }
};

const UnhappyButtonIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'happiness_scale_one';
  },
  handle(handlerInput) {
    return UnhappyHandler.handle(handlerInput);
  }
};

const goBackIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'goBack';
  },
  handle(handlerInput) {
    return LaunchRequestHandler.handle(handlerInput);
  }
};

const BackToHappyIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'back_to_happy';
  },
  handle(handlerInput) {
    return HappyHandler.handle(handlerInput);
  }
};

const BackToNeitherIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'back_to_neither';
  },
  handle(handlerInput) {
    return NeitherHandler.handle(handlerInput);
  }
};

const BackToUnhappyIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'back_to_unhappy';
  },
  handle(handlerInput) {
    return UnhappyHandler.handle(handlerInput);
  }
};

const HappyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HappyIntent';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      let speakOutput = 'It is great that you feel happy! According to the Healthline, feeling joy can promote a healthier lifestyle, boost immune system, fights stress and pain, and also support longevity. I have some tips for you to stay happy, would you like to know?';
      const repromptText = 'I have some tips for you to stay happy, would you like to know?' ;
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'happy_tip');
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText)
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: happy,
            datasources: happy_data
          })
        .getResponse();
    }else{
      let speakOutput = 'It is great that you feel happy! According to the Healthline, feeling joy can promote a healthier lifestyle, boost immune system, fights stress and pain, and also support longevity. I have some tips for you to stay happy, would you like to know?';
      const repromptText = 'I have some tips for you to stay happy, would you like to know?' ;
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'happy_tip');
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText)
        .getResponse();
    }
  },
};

// const InProgresshappierIntentHandler = {
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request;
//     return request.type === 'IntentRequest' &&
//       request.intent.name === 'othersugIntent' &&
//       request.dialogState !== 'COMPLETED';
//   },
//   handle(handlerInput) {
//     const currentIntent = handlerInput.requestEnvelope.request.intent;
//     return handlerInput.responseBuilder
//       .addDelegateDirective(currentIntent)
//       .getResponse();
//   },
// };

const happy_tip_yes = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'happy_tip';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'happy_tip');
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: anothersug2,
          datasources: anothersug_data2
        })
        .getResponse();
    }else{
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'happy_tip');
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  },
};

const happy_tip_no = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'happy_tip';
},
  handle(handlerInput) {
    return CancelAndStopHandler.handle(handlerInput);
  },
};

const happy_tip_Handler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'othertipIntent';
  },
  async handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'happy_tip');
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: anothersug2,
          datasources: anothersug_data2
        })
        .getResponse();
    }else{
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'happy_tip');
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  },
};

const NeitherHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'NeitherIntent';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = 'NHS suggests that mindfulness can help us enjoy life more and understand ourselves better. Yoga can help with developing awareness of your breathing. If possible, you might want to hit the mat and give Yoga a try. I have a video where you can learn what to do. Would you like to watch it?';
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'yoga_question');
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: neither,
            datasources: neither_data
          })
        .getResponse();
    }else{
      const speakOutput = 'NHS suggests that mindfulness can help us enjoy life more and understand ourselves better. Yoga can help with developing awareness of your breathing. If possible, you might want to hit the mat and give Yoga a try. I have a video where you can learn what to do. Would you like to watch it?';
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'yoga_question');
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  }
};

const PlayVideoButtonIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'PlayVideoButton';
  },
  handle(handlerInput) {
    return PlayVideoIntentHandler.handle(handlerInput);
  }
};

const OtherSuggestionButtonButtonIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'OtherSuggestionButton';
  },
  handle(handlerInput) {
    return OthersugHandler.handle(handlerInput);
  }
};

const PlayVideoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'PlayVideoIntent';
  },
  handle(handlerInput) {
    setQuestion(handlerInput, null);
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      handlerInput.responseBuilder.addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: video,
          datasources: video_data
      });
      return handlerInput.responseBuilder
        .getResponse();
    }else{
      let speakOutput = 'This video will only play on a device with a screen, such as an Echo Show or Fire TV. If you would like some other suggestions, please say \"other suggestions\".';
      let repromptText = 'This video will only play on a device with a screen, such as an Echo Show or Fire TV. If you would like some other suggestions, please say \"other suggestions\".';
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText)
        .getResponse();
    }
  }
};

const Yoga_question = {
 canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'yoga_question';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      handlerInput.responseBuilder.addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: video,
          datasources: video_data
      });
      setQuestion(handlerInput, null);
      return handlerInput.responseBuilder
        .getResponse();
    }else{
      let speakOutput = 'This video will only play on a device with a screen, such as an Echo Show or Fire TV. If you would like some other suggestions, please say \"other suggestions\".';
      let repromptText = 'This video will only play on a device with a screen, such as an Echo Show or Fire TV. If you would like some other suggestions, please say \"other suggestions\".';
      setQuestion(handlerInput, null);
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText)
        .getResponse();
    }
  }
};

const Yoga_question_no = {
 canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'yoga_question';
  },
  handle(handlerInput) {
    const speakOutput = 'Would you like some other suggestions for your happiness?';
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    setQuestion(handlerInput, 'suggestion_question');
    attributes.lastResult = speakOutput;
    handlerInput.attributesManager.setSessionAttributes(attributes);
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

const suggestion_question_no = {
 canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'suggestion_question';
  },
  handle(handlerInput) {
    return CancelAndStopHandler.handle(handlerInput);
  }
};

const suggestion_question = {
 canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'suggestion_question';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'suggestion_question');
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: anothersug,
          datasources: anothersug_data
        })
        .getResponse();
    }else{
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'suggestion_question');
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  }
};

const OthersugHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'othersugIntent';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'suggestion_question');
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: anothersug,
          datasources: anothersug_data
        })
        .getResponse();
    }else{
      const speakOutput = randomChoice(tipNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      setQuestion(handlerInput, 'suggestion_question');
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  }
};

const VideoEndedIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
    && handlerInput.requestEnvelope.request.arguments[0] === 'VIDEOENDED';
  },
  handle(handlerInput) {
    setQuestion(handlerInput, 'othersug_question');
    const actionQuery = "That's the end of the video. If you would like to rewatch the video, say \"play again\". If you would like some other suggestions, please say \"other suggestions\".";
    return handlerInput.responseBuilder
      .speak(actionQuery)
      .reprompt(actionQuery)
      .getResponse();
  }
};

const UnhappyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'UnhappyIntent';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = 'NHS suggest that connecting with other people is the first step to improve your wellbeing. Talking things through helps you to release tension, rather than keeping it inside. If possible, make a phone call with friends you have not talked to for a while. Would you like to learn how to call a friend or family member?';
      setQuestion(handlerInput, 'callfriend');
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: unhappy,
            datasources: unhappy_data
          })
        .getResponse();
    }else{
      const speakOutput = 'NHS suggest that connecting with other people is the first step to improve your wellbeing. Talking things through helps you to release tension, rather than keeping it inside. If possible, make a phone call with friends you have not talked to for a while. Would you like to learn how to call a friend or family member?';
      setQuestion(handlerInput, 'callfriend');
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  }
};

const Connect_people = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'callfriend';
  },
  handle(handlerInput) {
    setQuestion(handlerInput, null);
    const speakOutput = 'You can exit the skill first by saying \"Alexa, stop\".  Then say to me \"Alexa, make a phone call\". Would you like to hear another NHS happiness tip?';
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    setQuestion(handlerInput, 'try_something_question');
    attributes.lastResult = speakOutput;
    handlerInput.attributesManager.setSessionAttributes(attributes);
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const Connect_people_no = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'callfriend';
},
  handle(handlerInput) {
    const speakOutput = 'Would you like some other NHS happiness tips?';
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    setQuestion(handlerInput, 'try_something_question');
    attributes.lastResult = speakOutput;
    handlerInput.attributesManager.setSessionAttributes(attributes);
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const end_skill = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'try_something_question';
},
  handle(handlerInput) {
    return CancelAndStopHandler.handle(handlerInput);
  },
};

const trysomethingHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
        && handlerInput.attributesManager.getSessionAttributes().questionAsked === 'try_something_question';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
      const speakOutput = randomChoice(methodsNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      setQuestion(handlerInput, 'try_something_question');
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: trySomething,
          datasources: trySomething_data
        })
        .getResponse();
    }else{
      const speakOutput = randomChoice(methodsNum);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      setQuestion(handlerInput, 'try_something_question');
      attributes.lastResult = speakOutput;
      handlerInput.attributesManager.setSessionAttributes(attributes);
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  }
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'To provide feedback for your happiness, please tell me how happy are you feeling? Give a scale of one to three where one means unhappy and three means happy.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    let speakOutput = 'If I remember...';
    
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    if(attributes.lastResult){
      speakOutput = "I said: " + attributes.lastResult;
    }
    handlerInput.attributesManager.setSessionAttributes(attributes);
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Thanks for using Your Happiness. Your happiness is our top concern! Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(error.trace);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand what your said. Please say again.')
      .getResponse();
  },
};

const RequestLog = {
  process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
  },
};

const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)}`);
  },
};

function randomChoice(myArray) { 
  // myArray - the variable passed to the function will be an array of strings
  var i = 0;
  i = Math.floor(Math.random() * myArray.length);
  return(myArray[i]);
}
      
// function slotValue(slot, useId){
//   if(slot.value == undefined){
//       return "undefined";
//   }
//   let value = slot.value;
//   let resolution = (slot.resolutions && slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority.length > 0) ? slot.resolutions.resolutionsPerAuthority[0] : null;
//   if(resolution && resolution.status.code == 'ER_SUCCESS_MATCH'){
//       let resolutionValue = resolution.values[0].value;
//       value = resolutionValue.id && useId ? resolutionValue.id : resolutionValue.name;
//   }
//   return value;
// }

// function hasDisplay(requestEnvelope) {
//     var hasDisplay = requestEnvelope.context &&
//         requestEnvelope.context.System &&
//         requestEnvelope.context.System.device &&
//         requestEnvelope.context.System.device.supportedInterfaces &&
//         requestEnvelope.context.System.device.supportedInterfaces.Display;

//     return hasDisplay;
// }

function setQuestion(handlerInput, questionAsked) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  sessionAttributes.questionAsked = questionAsked;
  handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
}


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HappyButtonIntent,
    happy_tip_Handler,
    happy_tip_yes,
    happy_tip_no,
    NeitherButtonIntent,
    UnhappyButtonIntent,
    goBackIntent,
    HappyHandler,
    BackToHappyIntent,
    // InProgresshappierIntentHandler,
    NeitherHandler,
    PlayVideoButtonIntent,
    OtherSuggestionButtonButtonIntent,
    BackToNeitherIntent,
    PlayVideoIntentHandler,
    Yoga_question,
    Yoga_question_no,
    VideoEndedIntent,
    OthersugHandler,
    suggestion_question,
    suggestion_question_no,
    UnhappyHandler,
    Connect_people,
    Connect_people_no,
    trysomethingHandler,
    end_skill,
    BackToUnhappyIntent,
    HelpHandler,
    RepeatHandler,
    CancelAndStopHandler,
    SessionEndedRequestHandler,
  )
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  // .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
