import React, { useEffect, useState } from 'react';
import ChatAPI, { ChatMessage } from '../../apis/ChatAPI';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const AdminChatView: React.FC = () => {
  const { questionId, assessmentId } = useParams<{ questionId?: string; assessmentId?: string }>();

  // Convert parameters to numbers and handle undefined cases
  const questionIdNumber = questionId ? parseInt(questionId, 10) : NaN;
  const assessmentIdNumber = assessmentId ? parseInt(assessmentId, 10) : NaN;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNaN(questionIdNumber) && !isNaN(assessmentIdNumber)) {
      const fetchChatMessages = async () => {
        setLoading(true);
        try {
          const messages = await ChatAPI.getDSAFullChatMessages(questionIdNumber, assessmentIdNumber);
          setChatMessages(messages);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchChatMessages();
    } else {
      setError('Invalid parameters');
      setLoading(false);
    }
  }, [questionIdNumber, assessmentIdNumber]);

  if (loading) return (
    <Container>
      <CircularProgress />
    </Container>
  );
  if (error) return (
    <Container>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Admin Chat View - QuestionId: {questionIdNumber} | Assessment Id: {assessmentIdNumber}
      </Typography>
      <List>
        {chatMessages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={<Typography variant="subtitle1">{message.type}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Keys:</strong> {Object.keys(message).join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Values:</strong>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {JSON.stringify(message, null, 2)}
                    </pre>
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminChatView;
