import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import * as faceapi from 'face-api.js';

// export const 
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// export interface Pose {
//   keypoints: faceapi.FaceExpressionNet.keypoints[];
// }

// export interface Score {
//   score?: number;
//   time: number;
// }