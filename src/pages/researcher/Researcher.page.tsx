import * as React from 'react';
import { useState } from 'react';
import {
  IconBooks,
  IconCircleDashed,
  IconCircleDashedCheck,
  IconSend,
  IconX,
} from '@tabler/icons-react';
import {
  Button,
  Card,
  Divider,
  LoadingOverlay,
  Text,
  Textarea,
  useMantineColorScheme,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { Header } from '@/components/Header/Header';
import { ChatHistorySidebar } from './components/ChatHistorySidebar';
import { CurrentChatMessages } from './CurrentChatMessages';

export const Researcher: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [loadingDataSet, setLoadingDataSet] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Alex Ferguson',
      time: '2:45 PM',
      content: 'Hey, can you explain how the model determines token usage and tracks interactions?',
      tokens: null,
    },
    {
      sender: 'Prisma',
      time: '2:46 PM',
      content:
        'Sure! Our model counts tokens in both input and output, including spaces and special characters...',
      tokens: 32,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isNewMessageLoading, setIsNewMessageLoading] = useState(false);
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newChatMessage = {
      sender: 'Alex Ferguson',
      time: new Date().toLocaleTimeString(),
      content: newMessage,
      tokens: null,
    };

    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    setNewMessage('');

    // Simulate a response from the chat bot
    setTimeout(() => {
      const botResponse = {
        sender: 'Prisma',
        time: new Date().toLocaleTimeString(),
        content: 'This is a simulated response from the chat bot.',
        tokens: Math.floor(Math.random() * 100),
      };
      setChatMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  interface SupportedDataSet {
    label: string;
    id: string;
  }

  const availableDataSets: SupportedDataSet[] = [
    { label: 'Housing Market Data', id: 'housing' },
    { label: 'Labor Market Data', id: 'labor' },
    { label: 'Public Government Data', id: 'government' },
    { label: 'Public Financial Data', id: 'financial' },
  ];

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Header />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '97vh',
          flexDirection: 'column',
          padding: 30,
          gap: 10,
        }}
      >
        {/* Main Content */}
        <div
          style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'row', gap: 20 }}
        >
          {/* Left Sidebar */}
          <ChatHistorySidebar />

          {/* Chat Area */}
          <div style={{ flex: 1, padding: '8px' }}>
            <CurrentChatMessages messages={chatMessages} />
            {isNewMessageLoading && (
              <Card
                withBorder
                shadow="xs"
                p="md"
                radius="md"
                mt="xs"
                style={{ position: 'relative', backdropFilter: 'blur(5px)' }}
              >
                <LoadingOverlay visible loaderProps={{ type: 'bars', color: 'orange' }} />
                <Text size="sm" style={{ opacity: 0.5 }}>
                  Placeholder message...
                </Text>
              </Card>
            )}
            <div style={{ position: 'relative', marginTop: '16px' }}>
              <Textarea
                placeholder="How can I help you?"
                radius="sm"
                size="md"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.currentTarget.value);
                  console.log('cT.value: ', e.currentTarget.value);
                }}
                style={{ width: '100%', borderColor: colorScheme === 'light' ? 'black' : 'white' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  padding: 10,
                  backgroundColor: colorScheme === 'light' ? '#f1f1f1' : '#212121',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }} 
                onClick={handleSendMessage}>
                <IconSend
                  size={24}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ width: '20%', padding: '8px' }}>
            <Card withBorder>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                  <IconBooks size={18} />
                  <Text style={{ fontSize: 16, fontWeight: 300 }}>Live Datasets</Text>
                </div>
                <Button
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '5px 10px',
                    borderRadius: 5,
                    backgroundColor: '#FEC98F',
                    width: 'auto',
                  }}
                  onClick={() => setSelectedDataset('')}
                >
                  <IconX size={14} color="black" style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 12, fontWeight: 300, color: 'black', display: 'flex' }}>
                    Reset
                  </Text>
                </Button>
              </div>
              <Divider my="sm" />
              <div>
                {availableDataSets.map((dataset, index) => (
                  <Card
                    key={index}
                    withBorder
                    shadow="sm"
                    style={{
                      marginBottom: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedDataset === dataset.id ? '#f1f1f1' : 'transparent',
                    }}
                    onClick={() => setSelectedDataset(dataset.id)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        padding: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      {selectedDataset !== dataset.id && <IconCircleDashed size={16} />}
                      {selectedDataset === dataset.id && (
                        <>
                          <LoadingOverlay
                            visible={loadingDataSet}
                            zIndex={1000}
                            loaderProps={{ color: '#FEC98F', type: 'bars' }}
                          />
                          <IconCircleDashedCheck size={16} color="green" />
                        </>
                      )}
                      <div>
                        <input
                          type="radio"
                          name="dataset"
                          id={`dataset-${index}`}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor={`dataset-${index}`} style={{ cursor: 'pointer' }}>
                          <Text
                            size="sm"
                            style={{
                              fontWeight: 300,
                              color:
                                selectedDataset === dataset.id
                                  ? 'black'
                                  : colorScheme === 'dark'
                                    ? '#f1f1f1'
                                    : 'black',
                            }}
                          >
                            {dataset.label}
                          </Text>
                        </label>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
