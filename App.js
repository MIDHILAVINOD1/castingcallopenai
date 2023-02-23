import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import {Form, Button, Input, Select, Spin, DatePicker} from "antd";
// //import Moment from "moment";
// import moment from 'moment';

const configuration = new Configuration({
// apikey to be filled
});
const openai = new OpenAIApi(configuration);

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (values) => {
    
     console.log(values.title);
     console.log(values.organizer_name);
     console.log(values.casting_call_for);
     console.log(values.languages);

     console.log(values)

     let castingcallExpDate =  values.expiry_date.format("DD-MM-YYYY")

     console.log(castingcallExpDate)
    

     let promptData = `Generate a unique content for casting call in one paragraph 100 words for title: ${values.title},Organizer Name: ${values.organizer_name},Casting Call For: ${values.casting_call_for},Languages: ${values.languages},Expiry Date: ${castingcallExpDate}`;

    
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: promptData,
      temperature: 1,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    setResult(response.data?.choices[0].text);
  };

  return (
    <Form autoComplete="off"
      onFinish={handleSubmit}
       labelCol={{ span: 10}} 
       wrapperCol={{ span: 14}}
       >
          <Form.Item
          name="title" 
          label="Title"
          
          rules={[
            {
              required: true,
              message: "please enter your title",
            },
            { whitespace: true },
            { min: 3},
          ]}
          hasFeedback
          >
           <Input placeholder="Type your title" />
         </Form.Item>

         <Form.Item
          name="organizer_name" 
          label="Organizer Name"
          
          rules={[
            {
              required: true,
              message: "enter your organizer name",
            },
          ]}
          hasFeedback
          >
           <Input placeholder="Type your organizer name" />
         </Form.Item>

         <Form.Item
         name="casting_call_for" 
         label="CastingCallFor"
         
         rules={[
           {
             required: true,
             message: "enter casting call for",
           },
           { whitespace: true },
           { min: 3},
         ]}
         hasFeedback
         >
         <Select
         style={{ width: '100%' }}
         placeholder="Casting Call"
         
         options={[
           {
             options: [
               { label: 'Album',value:'album' },
               { label: 'Movie',value:'movie' },
               { label: 'Short film',value:'short film' },
               { label: 'Advertisement',value:'advertisement' },
             ],
           },
         ]}
        />
        </Form.Item>

        <Form.Item
          name="languages" 
          label="Languages"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          >
          <Select
          style={{ width: '100%' }}
          placeholder="Languages"
          options={[
            {
              options: [
                { label: 'Malayalam',value:'malayalam' },
                { label: 'English',value:'english' },
                { label: 'Hindi',value:'hindi' },
                { label: 'Kannada',value:'kannada' },
              ],
            },
          ]}
         />
          </Form.Item>

          <Form.Item
          name="expiry_date" 
          label="Expiry Date"
          
          rules={[
            {
              required: true,
              message: "please enter expiry date",
            },
          ]}
         // hasFeedback
          >
          <DatePicker 
          format={"DD-MM-YYYY"}
          style={{ width: "100%" }} 
          picker="date"
          placeholder="Expiry date"
          //defaultValue={moment('2015-01-01 YYYY-MM-DD')}
          />
         </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
           <Button block type="primary" htmlType="submit">
             SUBMIT
           </Button>
       </Form.Item>
       <Form.Item label="Description">
        {result ? (
        <p>{result}</p>
  ) : (
    <Spin size="small" />
  )}
</Form.Item>       
        </Form>
  );
        }


export default App;
