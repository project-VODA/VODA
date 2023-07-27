import React, { ChangeEvent, useState, useEffect } from 'react';
import '../App.css';

import axios from 'axios';
//@ts-ignore
import OpenViduSession from 'openvidu-react';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/voda/';

const OpenVidu: React.FC = () => {
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState('OpenVidu_User_' + Math.floor(Math.random() * 100));
  const [token, setToken] = useState<string | undefined>(undefined);
  const [session, setSession] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (session === undefined) {
      // Check if the user is already in a session
      // Here you can add logic to check if the user is already in a session and set 'session' accordingly
    }
  }, [session]);

  const handlerJoinSessionEvent = () => {
    console.log('Join session');
  };

  const handlerLeaveSessionEvent = () => {
    console.log('Leave session');
    setSession(undefined);
  };

  const handlerErrorEvent = () => {
    console.log('Leave session');
  };

  const handleChangeSessionId = (e: ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const joinSession = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mySessionId && myUserName) {
      const newToken = await getToken();
      setToken(newToken);
      setSession(true);
    }
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'meetings/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data as string; // The sessionId
  };

  const createToken = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'meetings/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data as string; // The token
  };

  return (
    <div>
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div id="session">
          {token && (
            <OpenViduSession
              id="opv-session"
              sessionName={mySessionId}
              user={myUserName}
              token={token}
              joinSession={handlerJoinSessionEvent}
              leaveSession={handlerLeaveSessionEvent}
              error={handlerErrorEvent}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OpenVidu;
