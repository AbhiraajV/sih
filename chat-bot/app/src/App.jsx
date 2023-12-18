import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message,Avatar, MessageInput, TypingIndicator,ConversationHeader } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
const systemMessage = {
  "role": "system", "content": `You are a chat bot for an Organization NEEPCO,
  \n NEEPCO makes procurement requets and tender on which venders bid and winner gets the procurement,
  Dont repeat any thing from question give straightforward answers
THIS IS VERY IMPORTANT:If for a question where tender information is given and questions are asked regarding it make up some data and tell that it was based on analysis of our database, \n\n
Each Tender is related to category and vendors are users who serve this category, if asked answer with some vendors that they can serve this product category

Never say "no vendors serve this category" always use Vendor1 and Vendor2 as default vendors saying they serve this product category, or come up with your own vendor names
  \n answer all questions very professionally, Here is some of the Data for you to work with: \n\n\n 
  
\n\n\n
And here is the data:
{"bid":[],"product":[{"id":31,"description":"Maintenance services related to electrical systems and equipment.","category":"ElectricalMaintenance"},{"id":32,"description":"Civil engineering and hydro-mechanical construction works.","category":"CivilAndHydroMechanicalWorks"},{"id":33,"description":"Procurement services for rail and cable systems.","category":"RailAndCableProcurement"},{"id":34,"description":"Supply of multifunctional equipment for diverse applications.","category":"MultifunctionalEquipmentSupply"},{"id":35,"description":"Construction of infrastructure related to security measures and systems.","category":"SecurityInfrastructureConstruction"},{"id":36,"description":"Maintenance services for various types of infrastructure.","category":"InfrastructureMaintenance"},{"id":37,"description":"Procurement of water purification systems and related equipment.","category":"WaterPurificationSystemProcurement"},{"id":38,"description":"Construction services for residential buildings and structures.","category":"ResidentialConstruction"},{"id":39,"description":"Procurement services for various supplies and equipment.","category":"SupplyAndEquipmentProcurement"},{"id":40,"description":"Studies to assess the practicality and viability of a proposed project or system.","category":"FeasibilityStudies"},{"id":41,"description":"Services for coating floors and painting surfaces.","category":"FloorCoatingAndPaintingService"},{"id":42,"description":"Services related to hiring cars and taxis for transportation needs.","category":"CarAndTaxiHiringServices"},{"id":43,"description":"Construction services for gabion walls, typically used in retaining structures.","category":"GabionWallConstruction"},{"id":44,"description":"Services for renovating and modernizing existing structures and systems.","category":"RenovationAndModernization"},{"id":45,"description":"Services related to surveys and topographical mapping.","category":"SurveyAndTopographicalServices"}],"productUser":[{"productId":31,"userId":3},{"productId":32,"userId":3},{"productId":35,"userId":3},{"productId":38,"userId":1},{"productId":39,"userId":1},{"productId":42,"userId":1}],"tender":[{"id":1,"BidEndDate":"2022-02-08T18:30:00.000Z","BidStartDate":"2022-01-19T18:30:00.000Z","BidNumber":"GEM-1029iU","Ministry":"Ministry of Power","Organisation":"North Eastern Electric Power Cooperation Limited","OfficeName":"Central Railway Stores Deptt","Quantity":3,"MinAvgAnTurnover":"3000000","BidderYox":3,"MseExemptionOnTurnoverAndYox":true,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover\n*In case any bidder is seeking exemption from Experience /\nTurnover Criteria, the supporting documents to prove his\neligibility for exemption must be uploaded for evaluation by\nthe buye","TenderInformation":"NEEPCO Ltd. has published e-tender vide Bid No. : GEM/2023/B/4313978 Dated: 08.12.2023 in \nGovt. e-Marketplace (GeM) portal (https://gem.gov.in) for the contract “PREPARATION OF PRE\u0002FEASIBILITY REPORT (PFR) FOR KURUNG HYDRO ELECTRIC PROJECT (320 MW), KRA DAADI \nDISTRICT, ARUNACHAL PRADESH”.\nInterested bidders are requested to visit the GeM portal for participation in the tender. Any subsequent \nchange/modifications/ notifications against this tender shall be updated in GeM portal only.\nDated: 08.12.2023 ","TenderInformationDoc":"","GemBidDocument":"","userId":1},{"id":2,"BidEndDate":"2022-02-08T18:30:00.000Z","BidStartDate":"2022-01-19T18:30:00.000Z","BidNumber":"GeM-POP0909","Ministry":"Ministry of Power","Organisation":"North Eastern Electric Power Cooperation Limited","OfficeName":"Central Railway Stores Deptt","Quantity":10,"MinAvgAnTurnover":"500000000","BidderYox":12,"MseExemptionOnTurnoverAndYox":true,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover\n*In case any bidder is seeking exemption from Experience /\nTurnover Criteria, the supporting documents to prove his\neligibility for exemption must be uploaded for evaluation by\nthe buye","TenderInformation":"","TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/d6588c34-bf2d-4419-899b-b909565c31e3.pdf","GemBidDocument":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/afb9626e-8f13-442e-aa76-bb289317d514.pdf","userId":1},{"id":3,"BidEndDate":"2022-02-08T18:30:00.000Z","BidStartDate":"2022-01-19T18:30:00.000Z","BidNumber":"GeM-JYT918","Ministry":"Ministry of Power","Organisation":"North Eastern Electric Power Cooperation Limited","OfficeName":"NEEPCO Head Office","Quantity":90,"MinAvgAnTurnover":"500000000","BidderYox":10,"MseExemptionOnTurnoverAndYox":true,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover\n*In case any bidder is seeking exemption from Experience /\nTurnover Criteria, the supporting documents to prove his\neligibility for exemption must be uploaded for evaluation by\nthe buye","TenderInformation":"","TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/31659ee5-1c59-4d05-baf5-db255da36877.pdf","GemBidDocument":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/a37e03b8-6fd3-4919-98f3-14a25a4870da.pdf","userId":1},{"id":4,"BidEndDate":"2022-02-08T18:30:00.000Z","BidStartDate":"2022-01-19T18:30:00.000Z","BidNumber":null,"Ministry":"Ministry of Power","Organisation":"North Eastern Electric Power Cooperation Limited","OfficeName":null,"Quantity":null,"MinAvgAnTurnover":null,"BidderYox":null,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":null,"TenderInformation":null,"TenderInformationDoc":null,"GemBidDocument":null,"userId":1},{"id":5,"BidEndDate":"2023-11-14T07:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4135727","Ministry":"Ministry Of Railways","Organisation":"Central Railway","OfficeName":"Central Railway Stores Deptt","Quantity":0,"MinAvgAnTurnover":null,"BidderYox":0,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover","TenderInformation":null,"TenderInformationDoc":null,"GemBidDocument":null,"userId":1},{"id":6,"BidEndDate":"2023-11-14T07:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4135727","Ministry":"Ministry Of Railways","Organisation":"Central Railway","OfficeName":"Central Railway Stores Deptt","Quantity":0,"MinAvgAnTurnover":null,"BidderYox":0,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover","TenderInformation":null,"TenderInformationDoc":null,"GemBidDocument":null,"userId":1},{"id":7,"BidEndDate":"2023-11-14T07:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4135727","Ministry":"Ministry Of Railways","Organisation":"Central Railway","OfficeName":"Central Railway Stores Deptt","Quantity":0,"MinAvgAnTurnover":null,"BidderYox":0,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover","TenderInformation":null,"TenderInformationDoc":null,"GemBidDocument":null,"userId":3},{"id":8,"BidEndDate":"2023-11-14T07:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4135727","Ministry":"Ministry Of Railways","Organisation":"Central Railway","OfficeName":"Central Railway Stores Deptt","Quantity":0,"MinAvgAnTurnover":null,"BidderYox":0,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":"Experience Criteria,Bidder Turnover","TenderInformation":null,"TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/76ddff1b-2cd1-4ccb-84fa-29280ec8fe53.pdf","GemBidDocument":null,"userId":3},{"id":9,"BidEndDate":"2024-04-01T05:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4310808","Ministry":"Ministry Of Power","Organisation":"North Eastern Electric Power Corporation Limited","OfficeName":"Doyang Hydro Electric Plant","Quantity":3737,"MinAvgAnTurnover":"30 Lakh (s)","BidderYox":3,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":"Experience Criteria,Past Performance,Bidder Turnover,Certificate (Requested in ATC),OEM Authorization Certificate,Additional Doc 1 (Requested in ATC),Additional Doc 2 (Requested in ATC),Additional Doc 3 (Requested in ATC),Compliance of BoQ specification and supporting document","TenderInformation":null,"TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/e261b074-c6e7-460d-99cc-32ad4d6b8acb.pdf","GemBidDocument":null,"userId":1},{"id":10,"BidEndDate":"2024-01-04T05:30:00.000Z","BidStartDate":"2024-01-04T06:00:00.000Z","BidNumber":"GEM/2023/B/4310808","Ministry":"Ministry Of Power","Organisation":"North Eastern Electric Power Corporation Limited","OfficeName":"Doyang Hydro Electric Plant","Quantity":3737,"MinAvgAnTurnover":"3000000","BidderYox":3,"MseExemptionOnTurnoverAndYox":true,"DocumentsRequiredFromBidder":"Experience Criteria,Past Performance,Bidder Turnover,Certificate (Requested in ATC),OEM Authorization Certificate,Additional Doc 1 (Requested in ATC),Additional Doc 2 (Requested in ATC),Additional Doc 3 (Requested in ATC),Compliance of BoQ specification and supporting document","TenderInformation":null,"TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/6203b937-8efe-4986-9957-8dcbfd372f80.pdf","GemBidDocument":null,"userId":1},{"id":11,"BidEndDate":"2024-01-04T05:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4310808","Ministry":"Ministry Of Power","Organisation":"North Eastern Electric Power Corporation Limited","OfficeName":"Doyang Hydro Electric Plant","Quantity":3737,"MinAvgAnTurnover":"30","BidderYox":3,"MseExemptionOnTurnoverAndYox":false,"DocumentsRequiredFromBidder":"Experience Criteria,Past Performance,Bidder Turnover,Certificate (Requested in ATC),OEM Authorization Certificate,Additional Doc 1 (Requested in ATC),Additional Doc 2 (Requested in ATC),Additional Doc 3 (Requested in ATC),Compliance of BoQ specification and supporting document","TenderInformation":null,"TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/f8ce8cda-cd71-4d36-b382-749c2325cbd5.pdf","GemBidDocument":null,"userId":1},{"id":12,"BidEndDate":"2024-04-01T05:30:00.000Z","BidStartDate":"2024-04-01T06:00:00.000Z","BidNumber":"GEM/2023/B/4310808","Ministry":"Ministry Of Power","Organisation":"North Eastern Electric Power Corporation Limited","OfficeName":"Doyang Hydro Electric Plant","Quantity":3737,"MinAvgAnTurnover":"30 Lakh","BidderYox":3,"MseExemptionOnTurnoverAndYox":true,"DocumentsRequiredFromBidder":"Experience Criteria, Past Performance, Bidder Turnover, Certificate (Requested in ATC), OEM Authorization Certificate, Additional Doc 1 (Requested in ATC), Additional Doc 2 (Requested in ATC), Additional Doc 3 (Requested in ATC), Compliance of BoQ specification and supporting document","TenderInformation":null,"TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/1e17798a-2416-481b-9b06-55f901c8268c.pdf","GemBidDocument":null,"userId":1},{"id":13,"BidEndDate":"2024-01-04T05:30:00.000Z","BidStartDate":"1970-01-01T00:00:00.000Z","BidNumber":"GEM/2023/B/4310808","Ministry":"Ministry Of Power","Organisation":"North Eastern Electric Power Corporation Limited","OfficeName":"Doyang Hydro Electric Plant","Quantity":3737,"MinAvgAnTurnover":"30 Lakh (s)","BidderYox":3,"MseExemptionOnTurnoverAndYox":true,"DocumentsRequiredFromBidder":"Experience Criteria,Past Performance,Bidder Turnover,Certificate (Requested in ATC),OEM Authorization Certificate,Additional Doc 1 (Requested in ATC),Additional Doc 2 (Requested in ATC),Additional Doc 3 (Requested in ATC),Compliance of BoQ specification and supporting document","TenderInformation":null,"TenderInformationDoc":"https://files.edgestore.dev/h2mfnr00q1913141/publicFiles/_public/19d4d768-1dfa-4ad2-a305-09cf8da4e616.pdf","GemBidDocument":null,"userId":1}],"tenderProductCategory":[{"productId":31,"tenderId":9},{"productId":31,"tenderId":10},{"productId":31,"tenderId":11},{"productId":31,"tenderId":12},{"productId":31,"tenderId":13},{"productId":32,"tenderId":13},{"productId":33,"tenderId":13},{"productId":34,"tenderId":13},{"productId":35,"tenderId":13},{"productId":36,"tenderId":13},{"productId":37,"tenderId":13},{"productId":38,"tenderId":13},{"productId":39,"tenderId":13},{"productId":40,"tenderId":8},{"productId":40,"tenderId":13},{"productId":41,"tenderId":13},{"productId":42,"tenderId":13},{"productId":43,"tenderId":13},{"productId":44,"tenderId":13},{"productId":45,"tenderId":13}],"user":[{"id":1,"userId":"user_2Wy5QBbVebzNw60IY5cDYd3h0gs","username":"Abhiraaj Verma","verified":"FALSE","email":"abhiraajverma@gmail.com","userType":"Admin","kycTime":null},{"id":3,"userId":"user_2Za3WoCiKZqZRN14iH0zay8DKe7","username":"Vendor Name","verified":"TRUE","email":"abhiraaj@empplan.com","userType":"Vendor","kycTime":"2023-12-22T12:55:00.000Z"}]}

Always refer to above Data before answering a question \n\n

  `
}

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello! How can I help you today?",
      sentTime: "just now",
      sender: "NEEPCO Bot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message:message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { 

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage, 
        ...apiMessages 
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "NEEPCO Bot"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "600px", width: "400px"  }}>
        <MainContainer style={{display:"flex",flexDirection:"column"}}>
          <ChatContainer>   
            <ConversationHeader>
                <ConversationHeader.Content userName={"NEEPCO AI Chat Bot"} />
              <Avatar src='https://static.vecteezy.com/system/resources/previews/010/054/157/original/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg'/>
            </ConversationHeader>
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Analysing NEEPCO Database" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App