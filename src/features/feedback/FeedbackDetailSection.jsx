import { postEvData } from '../../apis/apiPeer';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { useTogetherPeerEv } from '../../store/PeerStore/store';
import FeedbackQuestion from './FeedbackQuestion';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function FeedbackDetailSection() {
  return (
    <>
      <div className="p-2">
        <FeedbackQuestion />
      </div>
      <div className="p-10"></div>
    </>
  );
}
