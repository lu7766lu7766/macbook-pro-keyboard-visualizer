## ADDED Requirements
### Requirement: 按鍵敲擊音效
系統 SHALL 在使用者按下鍵盤（依 `KeyboardEvent.code`）時播放對應的敲擊音效，允許不同按鍵使用不同音色，提供即時聽覺回饋。

#### Scenario: 單鍵敲擊播放對應音效
- **WHEN** 使用者按下任意可辨識的鍵（含功能鍵與箭頭鍵）
- **THEN** 會立即播放該鍵對應的敲擊音效，且與按下的 `KeyboardEvent.code` 一致

#### Scenario: 連續敲擊與多鍵並發
- **WHEN** 使用者快速連續按同一鍵或同時按多個鍵
- **THEN** 每次敲擊都會觸發音效播放，彼此不會被上一個音效阻塞或吞掉

#### Scenario: 靜音控管
- **WHEN** 使用者切換靜音
- **THEN** 後續按鍵敲擊不播放音效，並可再切回恢復播放

#### Scenario: 音量調整
- **WHEN** 使用者調整音量（非靜音狀態）
- **THEN** 隨後的敲擊音效會依新音量播放，變更即時生效
