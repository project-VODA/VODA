import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDistpatch } from '../store/store';
// pose-estimation
// 인공지능 학습 모델
// import * as poseDetection from "@tensorflow-models/pose-detection";


// export const 
export const useAppDispatch: () => AppDistpatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
