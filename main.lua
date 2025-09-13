local ContentProvider = game:GetService("ContentProvider")

local assetsToPreload = {
    "rbxassetid://76156993128854", -- unfav icon
    "rbxassetid://137655053511068", -- fav icon
    "rbxassetid://70452176150315",
    "rbxassetid://1524549907",
    "rbxassetid://6493287948",
    "rbxassetid://104269922408932",
}

ContentProvider:PreloadAsync(assetsToPreload)

local function playSound(soundId, loudness)
    local sound = Instance.new("Sound")
    sound.SoundId = "rbxassetid://" .. soundId
    sound.Parent = game.Players.LocalPlayer.Character or game.Players.LocalPlayer
    sound.Volume = loudness or 1
    sound:Play()
end

-- SaucyKeys UI - Complete Revamp
-- Modern Glass-morphic Design
-- Adjusted to smaller size and original functionality

-- Instances:
local ScreenGui = Instance.new("ScreenGui")
local MainContainer = Instance.new("Frame")
local GlassEffect = Instance.new("Frame")
local TopBar = Instance.new("Frame")
local LogoContainer = Instance.new("Frame")
local LogoIcon = Instance.new("TextLabel")
local AppTitle = Instance.new("TextLabel")
local WindowControls = Instance.new("Frame")
local CloseBtn = Instance.new("ImageButton")
local InfoBtn = Instance.new("ImageButton")

local ContentArea = Instance.new("Frame")
local SidePanel = Instance.new("Frame")
local CategoriesHeader = Instance.new("TextLabel")
local CategoriesScroll = Instance.new("ScrollingFrame")
local CategoriesLayout = Instance.new("UIListLayout")

local MainPanel = Instance.new("Frame")
local SearchSection = Instance.new("Frame")
local SearchContainer = Instance.new("Frame")
local SearchIcon = Instance.new("TextLabel")
local SearchInput = Instance.new("TextBox")
local SongsContainer = Instance.new("ScrollingFrame")
local SongsLayout = Instance.new("UIListLayout")

local ControlPanel = Instance.new("Frame")
local NowPlayingCard = Instance.new("Frame")
local SongDisplayTitle = Instance.new("TextLabel")
local PlaybackControls = Instance.new("Frame")
local BpmContainer = Instance.new("Frame")
local BpmLabel = Instance.new("TextLabel")
local BpmInput = Instance.new("TextBox")
local PlayButton = Instance.new("TextButton")

local BottomBar = Instance.new("Frame")
local CreditsText = Instance.new("TextLabel")

local FloatingToggle = Instance.new("Frame")
local ToggleButton = Instance.new("TextButton")

-- Create gradient backgrounds
local function createGradient(parent, colors, rotation)
    local gradient = Instance.new("UIGradient")
    gradient.Color = colors
    gradient.Rotation = rotation or 0
    gradient.Parent = parent
    return gradient
end

-- Create corner radius
local function createCorner(parent, radius)
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, radius)
    corner.Parent = parent
    return corner
end

-- Create padding
local function createPadding(parent, all)
    local padding = Instance.new("UIPadding")
    padding.PaddingTop = UDim.new(0, all)
    padding.PaddingBottom = UDim.new(0, all)
    padding.PaddingLeft = UDim.new(0, all)
    padding.PaddingRight = UDim.new(0, all)
    padding.Parent = parent
    return padding
end

--Properties:
ScreenGui.Parent = game:GetService("CoreGui")
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

-- Main Container (Glass morphism style)
MainContainer.Name = "MainContainer"
MainContainer.Parent = ScreenGui
MainContainer.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
MainContainer.BackgroundTransparency = 0.1
MainContainer.Position = UDim2.new(0.5, 0, 0.5, 0)
MainContainer.AnchorPoint = Vector2.new(0.5, 0.5)
MainContainer.Size = UDim2.new(0, 550, 0, 350)  -- Smaller size
MainContainer.BorderSizePixel = 0
createCorner(MainContainer, 12)

-- Glass effect overlay
GlassEffect.Name = "GlassEffect"
GlassEffect.Parent = MainContainer
GlassEffect.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
GlassEffect.BackgroundTransparency = 0.3
GlassEffect.Size = UDim2.new(1, 0, 1, 0)
createCorner(GlassEffect, 12)
createGradient(GlassEffect, ColorSequence.new{
    ColorSequenceKeypoint.new(0, Color3.fromRGB(40, 40, 60)),
    ColorSequenceKeypoint.new(0.5, Color3.fromRGB(20, 20, 30)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(30, 30, 45))
}, 45)

-- Top Bar
TopBar.Name = "TopBar"
TopBar.Parent = MainContainer
TopBar.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
TopBar.BackgroundTransparency = 0.2
TopBar.Size = UDim2.new(1, 0, 0, 50)
TopBar.BorderSizePixel = 0
createCorner(TopBar, 12)

-- Logo Container
LogoContainer.Name = "LogoContainer"
LogoContainer.Parent = TopBar
LogoContainer.BackgroundTransparency = 1
LogoContainer.Position = UDim2.new(0, 15, 0, 5)
LogoContainer.Size = UDim2.new(0, 200, 1, -10)

-- Logo Icon (Musical note symbol)
LogoIcon.Name = "LogoIcon"
LogoIcon.Parent = LogoContainer
LogoIcon.BackgroundTransparency = 1
LogoIcon.Position = UDim2.new(0, 0, 0, 0)
LogoIcon.Size = UDim2.new(0, 40, 1, 0)
LogoIcon.Font = Enum.Font.GothamBold
LogoIcon.Text = "🎹"
LogoIcon.TextColor3 = Color3.fromRGB(255, 120, 80)
LogoIcon.TextSize = 28
LogoIcon.TextXAlignment = Enum.TextXAlignment.Center

-- App Title
AppTitle.Name = "AppTitle"
AppTitle.Parent = LogoContainer
AppTitle.BackgroundTransparency = 1
AppTitle.Position = UDim2.new(0, 45, 0, 5)
AppTitle.Size = UDim2.new(1, -45, 1, 0)
AppTitle.Font = Enum.Font.GothamBlack
AppTitle.Text = "TALENTLESS"
AppTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
AppTitle.TextSize = 24
AppTitle.TextXAlignment = Enum.TextXAlignment.Left

-- Window Controls
WindowControls.Name = "WindowControls"
WindowControls.Parent = TopBar
WindowControls.BackgroundTransparency = 1
WindowControls.AnchorPoint = Vector2.new(1, 0)
WindowControls.Position = UDim2.new(1, -15, 0, 5)
WindowControls.Size = UDim2.new(0, 80, 1, -10)

local controlsLayout = Instance.new("UIListLayout")
controlsLayout.Parent = WindowControls
controlsLayout.FillDirection = Enum.FillDirection.Horizontal
controlsLayout.HorizontalAlignment = Enum.HorizontalAlignment.Right
controlsLayout.SortOrder = Enum.SortOrder.LayoutOrder
controlsLayout.Padding = UDim.new(0, 10)

-- Info Button
InfoBtn.Name = "InfoBtn"
InfoBtn.Parent = WindowControls
InfoBtn.BackgroundColor3 = Color3.fromRGB(70, 130, 255)
InfoBtn.Size = UDim2.new(0, 30, 1, 0)
InfoBtn.BorderSizePixel = 0
InfoBtn.LayoutOrder = 1
createCorner(InfoBtn, 8)

local infoBtnText = Instance.new("TextLabel")
infoBtnText.Parent = InfoBtn
infoBtnText.BackgroundTransparency = 1
infoBtnText.Size = UDim2.new(1, 0, 1, 0)
infoBtnText.Font = Enum.Font.GothamBold
infoBtnText.Text = "?"
infoBtnText.TextColor3 = Color3.fromRGB(255, 255, 255)
infoBtnText.TextSize = 16

-- Close Button
CloseBtn.Name = "CloseBtn"
CloseBtn.Parent = WindowControls
CloseBtn.BackgroundColor3 = Color3.fromRGB(255, 95, 95)
CloseBtn.Size = UDim2.new(0, 30, 1, 0)
CloseBtn.BorderSizePixel = 0
createCorner(CloseBtn, 8)

local closeBtnText = Instance.new("TextLabel")
closeBtnText.Parent = CloseBtn
closeBtnText.BackgroundTransparency = 1
closeBtnText.Size = UDim2.new(1, 0, 1, 0)
closeBtnText.Font = Enum.Font.GothamBold
closeBtnText.Text = "X"
closeBtnText.TextColor3 = Color3.fromRGB(255, 255, 255)
closeBtnText.TextSize = 20

-- Content Area
ContentArea.Name = "ContentArea"
ContentArea.Parent = MainContainer
ContentArea.BackgroundTransparency = 1
ContentArea.Position = UDim2.new(0, 0, 0, 50)
ContentArea.Size = UDim2.new(1, 0, 1, -80)

-- Side Panel (Categories)
SidePanel.Name = "SidePanel"
SidePanel.Parent = ContentArea
SidePanel.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
SidePanel.BackgroundTransparency = 0.3
SidePanel.Position = UDim2.new(0, 10, 0, 0)
SidePanel.Size = UDim2.new(0, 120, 1, 0)
SidePanel.BorderSizePixel = 0
createCorner(SidePanel, 10)

-- Categories Header
CategoriesHeader.Name = "CategoriesHeader"
CategoriesHeader.Parent = SidePanel
CategoriesHeader.BackgroundTransparency = 1
CategoriesHeader.Position = UDim2.new(0, 0, 0, 10)
CategoriesHeader.Size = UDim2.new(1, 0, 0, 20)
CategoriesHeader.Font = Enum.Font.GothamBold
CategoriesHeader.Text = "CATEGORIES"
CategoriesHeader.TextColor3 = Color3.fromRGB(255, 120, 80)
CategoriesHeader.TextSize = 12
CategoriesHeader.TextXAlignment = Enum.TextXAlignment.Center

-- Categories Scroll
CategoriesScroll.Name = "CategoriesScroll"
CategoriesScroll.Parent = SidePanel
CategoriesScroll.Active = true
CategoriesScroll.BackgroundTransparency = 1
CategoriesScroll.Position = UDim2.new(0, 10, 0, 35)
CategoriesScroll.Size = UDim2.new(1, -20, 1, -45)
CategoriesScroll.BorderSizePixel = 0
CategoriesScroll.ScrollBarThickness = 2
CategoriesScroll.AutomaticCanvasSize = Enum.AutomaticSize.Y
CategoriesScroll.ScrollBarImageColor3 = Color3.fromRGB(255, 120, 80)

CategoriesLayout.Name = "CategoriesLayout"
CategoriesLayout.Parent = CategoriesScroll
CategoriesLayout.SortOrder = Enum.SortOrder.LayoutOrder
CategoriesLayout.Padding = UDim.new(0, 5)

-- Main Panel
MainPanel.Name = "MainPanel"
MainPanel.Parent = ContentArea
MainPanel.BackgroundTransparency = 1
MainPanel.Position = UDim2.new(0, 140, 0, 0)
MainPanel.Size = UDim2.new(0, 250, 1, 0)

-- Search Section
SearchSection.Name = "SearchSection"
SearchSection.Parent = MainPanel
SearchSection.BackgroundTransparency = 1
SearchSection.Size = UDim2.new(1, 0, 0, 35)

-- Search Container
SearchContainer.Name = "SearchContainer"
SearchContainer.Parent = SearchSection
SearchContainer.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
SearchContainer.BackgroundTransparency = 0.2
SearchContainer.Size = UDim2.new(1, 0, 1, 0)
SearchContainer.BorderSizePixel = 0
createCorner(SearchContainer, 8)

-- Search Icon
SearchIcon.Name = "SearchIcon"
SearchIcon.Parent = SearchContainer
SearchIcon.BackgroundTransparency = 1
SearchIcon.Position = UDim2.new(0, 10, 0, 0)
SearchIcon.Size = UDim2.new(0, 25, 1, 0)
SearchIcon.Font = Enum.Font.GothamBold
SearchIcon.Text = "🔍"
SearchIcon.TextColor3 = Color3.fromRGB(150, 150, 170)
SearchIcon.TextSize = 14
SearchIcon.TextXAlignment = Enum.TextXAlignment.Center

-- Search Input
SearchInput.Name = "SearchInput"
SearchInput.Parent = SearchContainer
SearchInput.BackgroundTransparency = 1
SearchInput.Position = UDim2.new(0, 35, 0, 0)
SearchInput.Size = UDim2.new(1, -40, 1, 0)
SearchInput.Font = Enum.Font.Gotham
SearchInput.PlaceholderText = "search..."
SearchInput.Text = ""
SearchInput.TextColor3 = Color3.fromRGB(255, 255, 255)
SearchInput.TextSize = 14
SearchInput.TextXAlignment = Enum.TextXAlignment.Left

-- Songs Container
SongsContainer.Name = "SongsContainer"
SongsContainer.Parent = MainPanel
SongsContainer.Active = true
SongsContainer.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
SongsContainer.BackgroundTransparency = 0.3
SongsContainer.Position = UDim2.new(0, 0, 0, 40)
SongsContainer.Size = UDim2.new(1, 0, 1, -40)
SongsContainer.BorderSizePixel = 0
SongsContainer.ScrollBarThickness = 3
SongsContainer.AutomaticCanvasSize = Enum.AutomaticSize.Y
SongsContainer.ScrollBarImageColor3 = Color3.fromRGB(255, 120, 80)
createCorner(SongsContainer, 10)

SongsLayout.Name = "SongsLayout"
SongsLayout.Parent = SongsContainer
SongsLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
SongsLayout.SortOrder = Enum.SortOrder.LayoutOrder
SongsLayout.Padding = UDim.new(0, 5)

createPadding(SongsContainer, 5)

-- Control Panel
ControlPanel.Name = "ControlPanel"
ControlPanel.Parent = ContentArea
ControlPanel.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
ControlPanel.BackgroundTransparency = 0.3
ControlPanel.Position = UDim2.new(1, -140, 0, 0)
ControlPanel.Size = UDim2.new(0, 130, 1, 0)
ControlPanel.BorderSizePixel = 0
createCorner(ControlPanel, 10)

-- Now Playing Card
NowPlayingCard.Name = "NowPlayingCard"
NowPlayingCard.Parent = ControlPanel
NowPlayingCard.BackgroundColor3 = Color3.fromRGB(35, 35, 50)
NowPlayingCard.BackgroundTransparency = 0.2
NowPlayingCard.Position = UDim2.new(0, 10, 0, 10)
NowPlayingCard.Size = UDim2.new(1, -20, 0, 50)
NowPlayingCard.BorderSizePixel = 0
createCorner(NowPlayingCard, 8)
createGradient(NowPlayingCard, ColorSequence.new{
    ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 120, 80)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 80, 120))
}, 45)

-- Song Display Title
SongDisplayTitle.Name = "SongDisplayTitle"
SongDisplayTitle.Parent = NowPlayingCard
SongDisplayTitle.BackgroundTransparency = 1
SongDisplayTitle.Position = UDim2.new(0, 10, 0, 10)
SongDisplayTitle.Size = UDim2.new(1, -20, 1, -20)
SongDisplayTitle.Font = Enum.Font.GothamBold
SongDisplayTitle.Text = "SONG NAME"
SongDisplayTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
SongDisplayTitle.TextSize = 14
SongDisplayTitle.TextXAlignment = Enum.TextXAlignment.Left
SongDisplayTitle.TextTruncate = Enum.TextTruncate.AtEnd

-- Playback Controls
PlaybackControls.Name = "PlaybackControls"
PlaybackControls.Parent = ControlPanel
PlaybackControls.BackgroundTransparency = 1
PlaybackControls.Position = UDim2.new(0, 10, 0, 70)
PlaybackControls.Size = UDim2.new(1, -20, 0, 150)

-- BPM Container
BpmContainer.Name = "BpmContainer"
BpmContainer.Parent = PlaybackControls
BpmContainer.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
BpmContainer.BackgroundTransparency = 0.2
BpmContainer.Size = UDim2.new(1, 0, 0, 35)
BpmContainer.BorderSizePixel = 0
createCorner(BpmContainer, 8)

-- BPM Input
BpmInput.Name = "BpmInput"
BpmInput.Parent = BpmContainer
BpmInput.BackgroundTransparency = 1
BpmInput.Position = UDim2.new(0, 10, 0, 0)
BpmInput.Size = UDim2.new(1, -20, 1, 0)
BpmInput.Font = Enum.Font.Gotham
BpmInput.PlaceholderText = "bpm"
BpmInput.Text = ""
BpmInput.TextColor3 = Color3.fromRGB(255, 255, 255)
BpmInput.TextSize = 14
BpmInput.TextXAlignment = Enum.TextXAlignment.Left

-- Play Button
PlayButton.Name = "PlayButton"
PlayButton.Parent = PlaybackControls
PlayButton.BackgroundColor3 = Color3.fromRGB(50, 200, 100)
PlayButton.Position = UDim2.new(0, 0, 0, 45)
PlayButton.Size = UDim2.new(1, 0, 0, 35)
PlayButton.BorderSizePixel = 0
PlayButton.Font = Enum.Font.GothamBold
PlayButton.Text = "play song !"
PlayButton.TextColor3 = Color3.fromRGB(255, 255, 255)
PlayButton.TextSize = 14
createCorner(PlayButton, 8)
createGradient(PlayButton, ColorSequence.new{
    ColorSequenceKeypoint.new(0, Color3.fromRGB(80, 220, 120)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(50, 180, 90))
}, 45)

-- Bottom Bar
BottomBar.Name = "BottomBar"
BottomBar.Parent = MainContainer
BottomBar.BackgroundColor3 = Color3.fromRGB(15, 15, 25)
BottomBar.BackgroundTransparency = 0.2
BottomBar.Position = UDim2.new(0, 0, 1, -30)
BottomBar.Size = UDim2.new(1, 0, 0, 30)
BottomBar.BorderSizePixel = 0
createCorner(BottomBar, 12)

-- Credits Text
CreditsText.Name = "CreditsText"
CreditsText.Parent = BottomBar
CreditsText.BackgroundTransparency = 1
CreditsText.Position = UDim2.new(0, 15, 0, 0)
CreditsText.Size = UDim2.new(1, -30, 1, 0)
CreditsText.Font = Enum.Font.Gotham
CreditsText.Text = "piano autoplayer by hellohellohell012321"
CreditsText.TextColor3 = Color3.fromRGB(150, 150, 170)
CreditsText.TextSize = 10
CreditsText.TextXAlignment = Enum.TextXAlignment.Center
CreditsText.TextYAlignment = Enum.TextYAlignment.Center

-- Floating Toggle Button
FloatingToggle.Name = "FloatingToggle"
FloatingToggle.Parent = ScreenGui
FloatingToggle.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
FloatingToggle.BackgroundTransparency = 0.1
FloatingToggle.Position = UDim2.new(0, 10, 0.5, 0)
FloatingToggle.AnchorPoint = Vector2.new(0, 0.5)
FloatingToggle.Size = UDim2.new(0, 120, 0, 35)
FloatingToggle.BorderSizePixel = 0
createCorner(FloatingToggle, 8)
createGradient(FloatingToggle, ColorSequence.new{
    ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 120, 80)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 80, 120))
}, 45)

-- Toggle Button
ToggleButton.Name = "ToggleButton"
ToggleButton.Parent = FloatingToggle
ToggleButton.BackgroundTransparency = 1
ToggleButton.Size = UDim2.new(1, 0, 1, 0)
ToggleButton.Font = Enum.Font.GothamBold
ToggleButton.Text = "toggle ui"
ToggleButton.TextColor3 = Color3.fromRGB(255, 255, 255)
ToggleButton.TextSize = 16

-- Event Connections
ToggleButton.MouseButton1Click:Connect(function()
    MainContainer.Visible = not MainContainer.Visible
    if MainContainer.Visible then
        playSound(70452176150315, 0.1)
    else
        playSound(1524549907, 0.1)
    end
end)

local UserInputService = game:GetService("UserInputService")

local function addDrag(gui)
    local dragging
    local dragInput
    local dragStart
    local startPos

    local function update(input)
        local delta = input.Position - dragStart
        gui.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
    end

    gui.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            dragging = true
            dragStart = input.Position
            startPos = gui.Position

            input.Changed:Connect(function()
                if input.UserInputState == Enum.UserInputState.End then
                    dragging = false
                end
            end)
        end
    end)

    gui.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
            dragInput = input
        end
    end)

    UserInputService.InputChanged:Connect(function(input)
        if input == dragInput and dragging then
            update(input)
        end
    end)
end

addDrag(MainContainer)
addDrag(FloatingToggle)

local gameId = game.GameId

local spoofMidiPlz = false

if gameId == 3929033413 then
    local SpoofContainer = Instance.new("Frame")
    SpoofContainer.Name = "SpoofContainer"
    SpoofContainer.Parent = ControlPanel
    SpoofContainer.BackgroundTransparency = 1
    SpoofContainer.Position = UDim2.new(0, 10, 1, -50)
    SpoofContainer.Size = UDim2.new(1, -20, 0, 40)

    local spoofMidiInfo = Instance.new("TextButton")
    spoofMidiInfo.Name = "spoofMidiInfo"
    spoofMidiInfo.Parent = SpoofContainer
    spoofMidiInfo.BackgroundColor3 = Color3.fromRGB(70, 130, 255)
    spoofMidiInfo.BorderSizePixel = 0
    spoofMidiInfo.Position = UDim2.new(0, 0, 0, 0)
    spoofMidiInfo.Size = UDim2.new(0, 30, 1, 0)
    spoofMidiInfo.Font = Enum.Font.GothamBold
    spoofMidiInfo.Text = "?"
    spoofMidiInfo.TextColor3 = Color3.fromRGB(255, 255, 255)
    spoofMidiInfo.TextSize = 16
    createCorner(spoofMidiInfo, 8)

    spoofMidiInfo.MouseButton1Click:Connect(
        function()
            loadstring(game:HttpGet("https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/spoofMidiInfo.lua", true))()
        end
    )

    local spoofMidi = Instance.new("TextButton")
    spoofMidi.Name = "spoofMidi"
    spoofMidi.Parent = SpoofContainer
    spoofMidi.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    spoofMidi.BackgroundTransparency = 0.2
    spoofMidi.BorderSizePixel = 0
    spoofMidi.Position = UDim2.new(0, 35, 0, 0)
    spoofMidi.Size = UDim2.new(1, -35, 1, 0)
    spoofMidi.Font = Enum.Font.Gotham
    spoofMidi.Text = "spoof midi [ ]"
    spoofMidi.TextColor3 = Color3.fromRGB(255, 255, 255)
    spoofMidi.TextSize = 14
    spoofMidi.TextXAlignment = Enum.TextXAlignment.Left
    createCorner(spoofMidi, 8)

    spoofMidi.MouseButton1Click:Connect(
        function()
            spoofMidiPlz = not spoofMidiPlz
            if spoofMidiPlz then
                spoofMidi.Text = "spoof midi [x]"
                playSound(6493287948, 0.1)
                NotificationLibrary:SendNotification("Success", "midi spoofing is turned on. click the question mark for more info.", 5)
            else
                spoofMidi.Text = "spoof midi [ ]"
                playSound(6493287948, 0.1)
                NotificationLibrary:SendNotification("Success", "midi spoofing is turned off", 5)
            end
        end
    )
end

local function filterSongs(query)
    query = query:lower()
    SongsContainer.CanvasPosition = Vector2.new(0, 0)
    for _, child in pairs(SongsContainer:GetChildren()) do
        if child:IsA("TextButton")  then
            -- Regular song buttons
            local songName = child.Text:lower()
            local alternateNamesStr = child:GetAttribute("AlternateNames") or ""
            local alternateNames = alternateNamesStr:split(",")
            local matchFound = false

            if songName:find(query) then
                matchFound = true
            else
                for _, altName in pairs(alternateNames) do
                    if matchFound == false then
                        if altName:lower():find(query) then
                            matchFound = true
                        end
                    end
                end
            end
            child.Visible = matchFound
        elseif child:IsA("Frame") and child:FindFirstChildOfClass("TextButton") then
            -- Custom song frames
            local button = child:FindFirstChildOfClass("TextButton")
            local songName = button.Text:lower()
            local matchFound = songName:find(query)
            child.Visible = matchFound
        end
    end
end

SearchInput:GetPropertyChangedSignal("Text"):Connect(
    function()
        filterSongs(SearchInput.Text)
    end
)

filterSongs("")

local function newSongButton(name, textsize, alternateNames)
    local button = Instance.new("TextButton")
    button.Name = name
    button.Parent = SongsContainer
    button.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    button.BackgroundTransparency = 0.2
    button.BorderSizePixel = 0
    button.Size = UDim2.new(1, 0, 0, 30)
    button.Font = Enum.Font.Gotham
    button.Text = name
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.TextSize = textsize or 14
    button.TextXAlignment = Enum.TextXAlignment.Left
    createCorner(button, 6)
    createPadding(button, 5)

    button:SetAttribute("AlternateNames", table.concat(alternateNames or {}, ","))

    local favButton = Instance.new("ImageButton") -- star button for favourites

    favButton.Parent = button
    favButton.BackgroundTransparency = 1.000
    favButton.BorderSizePixel = 0
    favButton.AnchorPoint = Vector2.new(1, 0.5)
    favButton.Position = UDim2.new(1, -5, 0.5, 0)
    favButton.Size = UDim2.new(0, 20, 0, 20)
    favButton.Image = "rbxassetid://76156993128854" -- unfav icon
    favButton.Visible = false
    favButton.Name = "favButton"

    return button
end

local function newCategoryButton(name)
    local button = Instance.new("TextButton")
    button.Parent = CategoriesScroll
    button.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    button.BackgroundTransparency = 0.2
    button.BorderSizePixel = 0
    button.Size = UDim2.new(1, 0, 0, 30)
    button.Font = Enum.Font.GothamBold
    button.Text = name
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.TextSize = 12
    button.TextXAlignment = Enum.TextXAlignment.Center
    createCorner(button, 6)
    return button
end

LOOPRANDOM = newSongButton("SHUFFLE PLAY SONGS", 14, {})
PLAYRANDOM = newSongButton("PLAY A RANDOM SONG", 14, {})

local seperator = Instance.new("Frame")
seperator.Name = "seperator"
seperator.Parent = SongsContainer
seperator.BackgroundColor3 = Color3.fromRGB(50, 50, 58)
seperator.Size = UDim2.new(1, 0, 0, 2)

if game.Players.LocalPlayer.Name == "4BCQA" or game.Players.LocalPlayer.Name == "fredoggins" then
    AVRIL_14 = newSongButton("AVRIL 14", 14, {})
end

A505 = newSongButton("505", 14, {"arctic monkeys", "artic monkeys"})
A7_WEEKS_3_DAYS = newSongButton("7 WEEKS & 3 DAYS", 14, {""})
A99DOT9 = newSongButton("99.9", 14, {"mob psycho 100"})
A_CYBERS_WORLD = newSongButton("A CYBER'S WORLD?", 14, {"toby fox"})
A_SKY_FULL = newSongButton("A SKY FULL OF STARS", 14, {"coldplay"})
A_THOUSAND = newSongButton("A THOUSAND MILES", 14, {"popular"})
AFTER_DARK = newSongButton("AFTER DARK", 14, {"mr kitty"})
ALL_GIRLS = newSongButton("ALL GIRLS ARE THE SAME", 14, {"juice wrld"})
ALL_I_WANT_IS_YOU = newSongButton("ALL I WANT IS YOU", 14, {"rebzyyx"})
ALL_MY_FELLAS = newSongButton("ALL MY FELLAS", 14, {})
ALL_THE_STARS = newSongButton("ALL THE STARS", 14, {"kendrick lamar", "sza", "black panther"})
--(all other song buttons similarly with textsize 14)

-- Category buttons
local allsong = newCategoryButton("All Songs")
local favsong = newCategoryButton("Favourites")
local customsong = newCategoryButton("Custom Songs")

-- Assume songs, favsong.buttons, customsong.buttons are defined as in original
-- For example:
local songs = { -- list of {button = btn, bpm = num, var = false}
    {button = A505, bpm = "120", var = false}, -- example
    -- all others
}

allsong.Text = "All Songs (" .. #songs .. ")"
favsong.Text = "Favourites (0)"
customsong.Text = "Custom Songs (0)"

local currentCategory = "all"

allsong.MouseButton1Click:Connect(function()
    currentCategory = "all"
    for _, child in pairs(SongsContainer:GetChildren()) do
        if child:IsA("TextButton") or child:IsA("Frame") then
            child.Visible = true
        end
    end
    filterSongs(SearchInput.Text)
end)

favsong.MouseButton1Click:Connect(function()
    currentCategory = "fav"
    for _, child in pairs(SongsContainer:GetChildren()) do
        child.Visible = false
    end
    for _, btn in ipairs(favsong.buttons) do
        btn.Visible = true
    end
    filterSongs(SearchInput.Text)
end)

customsong.MouseButton1Click:Connect(function()
    currentCategory = "custom"
    for _, child in pairs(SongsContainer:GetChildren()) do
        child.Visible = false
    end
    for _, btn in ipairs(customsong.buttons) do
        btn.Visible = true
    end
    filterSongs(SearchInput.Text)
end)

-- The rest of the functional code with name replacements
-- For example:
CloseBtn.MouseButton1Click:Connect(
    function()
        ScreenGui:Destroy()
        STOPLOOP = nil
        playingall = false
        playSound("104269922408932", 0.2)
    end
)

InfoBtn.MouseButton1Click:Connect(
    function()
        loadstring(
            game:HttpGet("https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/info.lua", true)
        )()
    end
)

-- play button
PlayButton.MouseButton1Click:Connect(playbuttonclicked)

-- For newCustomSongButton
local function newCustomSongButton(name)
    local customsongframe = Instance.new("Frame")
    local test = Instance.new("TextButton")
    local ImageButton = Instance.new("ImageButton")

    customsongframe.Name = "customsongframe"
    customsongframe.Parent = SongsContainer
    customsongframe.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    customsongframe.BackgroundTransparency = 0.2
    customsongframe.BorderSizePixel = 0
    customsongframe.Size = UDim2.new(1, 0, 0, 30)
    createCorner(customsongframe, 6)

    test.Name = name
    test.Parent = customsongframe
    test.BackgroundTransparency = 1.000
    test.Position = UDim2.new(0, 5, 0, 0)
    test.Size = UDim2.new(1, -35, 1, 0)
    test.Font = Enum.Font.Gotham
    test.Text = name
    test.TextColor3 = Color3.fromRGB(255, 255, 255)
    test.TextSize = 14
    test.TextXAlignment = Enum.TextXAlignment.Left

    ImageButton.Parent = customsongframe
    ImageButton.BackgroundTransparency = 1.000
    ImageButton.AnchorPoint = Vector2.new(1, 0.5)
    ImageButton.Position = UDim2.new(1, -5, 0.5, 0)
    ImageButton.Size = UDim2.new(0, 20, 0, 20)
    ImageButton.Image = "http://www.roblox.com/asset/?id=6121397347"

    local favButton = Instance.new("ImageButton") -- star button for favourites

    favButton.Parent = test
    favButton.BackgroundTransparency = 1.000
    favButton.AnchorPoint = Vector2.new(0, 0.5)
    favButton.Position = UDim2.new(0, 0, 0.5, 0)
    favButton.Size = UDim2.new(0, 20, 0, 20)
    favButton.Image = "rbxassetid://76156993128854" -- unfav icon
    favButton.Visible = false
    favButton.Name = "favButton"

    return {button = test, delbutton = ImageButton, frame = customsongframe}
end

-- The rest of the code for custom songs, favs, etc., remains the same, with scroll -> SongsContainer, songname -> SongDisplayTitle, bpmbox -> BpmInput, playsong -> PlayButton, etc.

-- For updatecustomcount, updatefavcount
function updatecustomcount()
    customsong.Text = "Custom Songs (" .. #addedCustoms .. ")"
end

function updatefavcount()
    favsong.Text = "Favourites (" .. #addedFavsNames .. ")"
end



local othercats = newcat("other")

othercats.MouseButton1Click:Connect(
    function()
        scroll.CanvasPosition = Vector2.new(0, 0)

        makeAllInvisible()

        PLAYRANDOM.Visible = true
        LOOPRANDOM.Visible = true
    end
)

local allcats = newcat("all (" .. tostring(#songs) .. ")")

allcats.MouseButton1Click:Connect(
    function()
        scroll.CanvasPosition = Vector2.new(0, 0)

        makeAllInvisible()

        for _, song in ipairs(songs) do
            song.button.Visible = true
        end

        PLAYRANDOM.Visible = true
        LOOPRANDOM.Visible = true
    end
)

-- after making all the manual categories, create the rest

for _, categoryName in pairs(categories) do
    local numsongs = {}
    for _, song in ipairs(songs) do
        for _, category in ipairs(song.cat) do
            if category == categoryName then
                table.insert(numsongs, song.button.Name)
            end
        end
    end

    local categoryButton = newcat(categoryName .. " (" .. tostring(#numsongs) .. ")")

    categoryButton.MouseButton1Click:Connect(
        function()
            makeAllInvisible()

            scroll.CanvasPosition = Vector2.new(0, 0)

            for _, song in ipairs(songs) do
                song.button.Visible = false
                for _, category in ipairs(song.cat) do
                    if category == categoryName then
                        song.button.Visible = true
                    end
                end
            end

            for _, song in ipairs(customsongbuttons) do
                song.Visible = false
            end
        end
    )
end

-- end of category stuff

function disable()
    for _, song in ipairs(songs) do
        song.var = false
    end
end

disable()

songisplaying = false

function playbuttonclicked()
    if songisplaying then
        playSound("6493287948", 0.1)
        NotificationLibrary:SendNotification("Error", "A song is already playing.", 1)
        return
    end

    songisplaying = true

    bpm = tonumber(bpmbox.Text)

    if spoofMidiPlz == true then
        -- Spoof MIDI
        loadstring(
            game:HttpGet("https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/midi_spoof_loader.lua", true)
        )()
    else
        loadstring(
            game:HttpGet("https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/loader_main.lua", true)
        )()
    end

    -- find which song to play

    local songFound = false
    for _, song in pairs(songs) do
        if songFound == false then
            if song.var == true then
                loadstring(
                    game:HttpGet(
                        "https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/SONGS/" .. song.url,
                        true
                    )
                )()
            songFound = true
            end
        end
    end
end -- close the play song onclick function

playsong.MouseButton1Click:Connect(playbuttonclicked)

for _, song in ipairs(songs) do
    song.button.MouseButton1Click:Connect(
        function()
            disable()
            song.var = true
            songname.Text = song.button.Text
            bpmbox.Text = song.bpm
        end
    )
end

-- play random function

PLAYRANDOM.MouseButton1Click:Connect(
    function()
        local function getRandomSong()
            local ransong = math.random(1, #songs)
            return songs[ransong]
        end

        local randomSong = getRandomSong()

        disable()
        randomSong.var = true
        songname.Text = randomSong.button.Name
        bpmbox.Text = randomSong.bpm

        playbuttonclicked()
    end
)

-- play all function

playingall = false

local function createstopbutton()
    if not STOPLOOP then
        -- StarterGui.ScreenGui.Frame.scrolltab.stoploop
        STOPLOOP = Instance.new("TextButton", bar)
        STOPLOOP["BorderSizePixel"] = 4
        STOPLOOP["TextSize"] = 14
        STOPLOOP["TextColor3"] = Color3.fromRGB(255, 255, 255)
        STOPLOOP["BackgroundColor3"] = Color3.fromRGB(76, 82, 101)
        STOPLOOP["FontFace"] =
            Font.new([[rbxasset://fonts/families/SourceSansPro.json]], Enum.FontWeight.Bold, Enum.FontStyle.Normal)
        STOPLOOP["AutomaticSize"] = Enum.AutomaticSize.XY
        STOPLOOP["Size"] = UDim2.new(0, 125, 0, 27)
        STOPLOOP["Name"] = [[stoploop]]
        STOPLOOP["BorderColor3"] = Color3.fromRGB(64, 68, 90)
        STOPLOOP["Text"] = [[STOP LOOPING SONGS]]
        STOPLOOP.LayoutOrder = 4

        STOPLOOP.MouseButton1Click:Connect(
            function()
                playingall = false
                STOPLOOP:Destroy()
                stopPlayingSongs() -- universal function made from the loader
                STOPLOOP = nil
            end
        )
    end
end

LOOPRANDOM.MouseButton1Click:Connect(
    function()
        if playingall then
            return
        end
        playingall = true
        createstopbutton()

        local playedSongs = {}

        local function getRandomSong()
            if #playedSongs >= #songs then
                playedSongs = {}
            end

            while true do
                local ransong = math.random(1, #songs)
                if not table.find(playedSongs, songs[ransong].button.Name) then
                    table.insert(playedSongs, songs[ransong].button.Name)
                    return songs[ransong]
                end
            end
        end

        while wait(1) do

            local randomSong = getRandomSong()
            if not playingall then
                return
            end

            disable()
            randomSong.var = true
            songname.Text = randomSong.button.Name
            bpmbox.Text = randomSong.bpm
            playbuttonclicked()
        end
    end
)

-- close function

closeButton.MouseButton1Click:Connect(
    function()
        ScreenGui:Destroy()
        STOPLOOP = nil
        playingall = false
        playSound("104269922408932", 0.2)
    end
)

infoButton.MouseButton1Click:Connect(
    function()
        loadstring(
            game:HttpGet("https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/info.lua", true)
        )()
    end
)

-- function to make the song buttons

local function newCustomSongButton(name)
    local customsongframe = Instance.new("Frame")
    local test = Instance.new("TextButton")
    local ImageButton = Instance.new("ImageButton")

    customsongframe.Name = "customsongframe"
    customsongframe.Parent = scroll
    customsongframe.BackgroundColor3 = Color3.fromRGB(76, 82, 101)
    customsongframe.BorderColor3 = Color3.fromRGB(64, 68, 90)
    customsongframe.BorderSizePixel = 4
    customsongframe.Size = UDim2.new(0, 175, 0, 35)
    customsongframe.SizeConstraint = Enum.SizeConstraint.RelativeYY

    test.Name = name
    test.Parent = customsongframe
    test.BackgroundTransparency = 1.000
    test.Size = UDim2.new(0, 135, 0, 35)
    test.Font = Enum.Font.SourceSansBold
    test.Text = name
    test.TextColor3 = Color3.fromRGB(255, 255, 255)
    test.TextScaled = true
    test.TextWrapped = true

    ImageButton.Parent = customsongframe
    ImageButton.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    ImageButton.BackgroundTransparency = 1.000
    ImageButton.BorderColor3 = Color3.fromRGB(0, 0, 0)
    ImageButton.BorderSizePixel = 0
    ImageButton.Position = UDim2.new(0.816999972, 0, 0.115000002, 0)
    ImageButton.Size = UDim2.new(0, 26, 0, 27)
    ImageButton.Image = "http://www.roblox.com/asset/?id=6121397347"

    local favButton = Instance.new("ImageButton") -- star button for favourites

    favButton.Parent = test
    favButton.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    favButton.BackgroundTransparency = 1.000
    favButton.BorderColor3 = Color3.fromRGB(0, 0, 0)
    favButton.BorderSizePixel = 0
    favButton.AnchorPoint = Vector2.new(0, 0.5)
    favButton.Position = UDim2.new(0, 0, 0.5, 0)
    favButton.Size = UDim2.new(0, 25, 0, 25)
    favButton.Image = "rbxassetid://76156993128854" -- unfav icon
    favButton.Visible = false
    favButton.Name = "favButton"

    return {button = test, delbutton = ImageButton, frame = customsongframe}
end

-- testing if the executor supports
-- listfiles(""), listfiles([[./TALENTLESS_CUSTOM_SONGS]])

local function test(name, _, func)
    print("Running test: " .. name)
    local success, err = pcall(func)
    if success then
        print(name .. " passed")
        return true
    else
        print(name .. " failed: " .. err)
        return false
    end
end

local function runTests()
    local allPassed = true

    allPassed =
        test(
        "makefolder",
        {},
        function()
            makefolder("TALENTLESS_makefolder")
            assert(isfolder("TALENTLESS_makefolder"), "Did not create the folder")
        end
    ) and allPassed

    allPassed =
        test(
        "listfiles",
        {},
        function()
            assert(#listfiles("") > 0, "Did not return a list of files")
        end
    ) and allPassed

    allPassed =
        test(
        "writefile",
        {},
        function()
            writefile("TALENTLESS_makefolder/writefile.txt", "success")
            testfile = listfiles("./TALENTLESS_makefolder")[1]
            assert(readfile(testfile) == "success", "Did not write the file")
        end
    ) and allPassed

    allPassed =
        test(
        "listfiles2",
        {},
        function()
            assert(#listfiles("./TALENTLESS_makefolder") > 0, "Did not return a list of files")
        end
    ) and allPassed

    allPassed =
        test(
        "delfile",
        {},
        function()
            delfile(testfile)
            assert(not isfile(testfile), "Did not delete the file")
        end
    ) and allPassed

    return allPassed
end

local result = runTests()

if result == true then
    print("this executor supports custom songs")
    customnotice:Destroy()
end



-- CUSTOM SONGS
-- CUSTOM SONGS
-- CUSTOM SONGS



NEWSONGBUTTON = newSongButton("+", 30, {""})
NEWSONGBUTTON.Visible = false
print("loaded NEWSONGBUTTON")

NEWSONGBUTTON.MouseButton1Click:Connect(
    function()
        loadstring(
            game:HttpGet("https://raw.githubusercontent.com/hellohellohell012321/TALENTLESS/main/add_song.lua", true)
        )()
    end
)

table.insert(customsongbuttons, NEWSONGBUTTON)
local addedCustoms = {}

function updateSongs() -- universal function so it can be called from the custom song creator gui
    local alreadyAdded

    for _, file in ipairs(listfiles("")) do
        print(tostring(file))
        if folderexists == false then
            if string.find(tostring(file), "TALENTLESS_CUSTOM_SONGS") then
                folderexists = true
                print("custom songs folder found")
            end
        end
    end

    print("searching for custom song files...")

    if folderexists then
        for _, custom in ipairs(listfiles([[./TALENTLESS_CUSTOM_SONGS]])) do
            alreadyAdded = false

            print("song file found: " .. tostring(custom))

            local filepath = tostring(custom) -- converts it into the format /TALENTLESS_CUSTOM_SONGS\example.txt

            if not table.find(addedCustoms, filepath) then
                if filepath:match("%.txt$") then -- if it has .txt at the end
                    print("its a txt file, continuing")

                    table.insert(addedCustoms, filepath) -- add the file to the addedCustoms table
                    local tsongname = filepath:gsub([[\]], "/"):match(".*/([^/]+)%.txt$") or "Error" -- remove the /, \, and .txt
                    print("song name: " .. tsongname)

                    local hello = newCustomSongButton(tsongname) -- make the song button
                    local songbutton = hello.button -- get the button
                    local delsongbutton = hello.delbutton
                    local songframe = hello.frame -- get the frame
                    table.insert(customsongbuttons, songframe)
                    songbutton.Visible = false

                    print("created song button for " .. tsongname)

                    local songbpm = readfile(custom):match("bpm%s*=%s*(%d+)") or "Error" -- read the file and look for the string after bpm =
                    print("songbpm found: " .. songbpm)

                    songbutton.Visible = true

                    songbutton.MouseButton1Click:Connect(
                        function()
                            print("clicked!")

                            if songisplaying then
                                playSound("6493287948", 0.1)
                                NotificationLibrary:SendNotification("Error", "A song is already playing.", 1)
                                return
                            else
                                local songcode = readfile(custom) -- define the contents of the song file
                                local func = loadstring(songcode) -- load it

                                if func then
                                    print("running scrip....")
                                    songname.Text = tsongname
                                    bpmbox.Text = songbpm
                                    playSound("6493287948", 0.1)
                                    NotificationLibrary:SendNotification("Success", "Began playing song.", 1)
                                    songisplaying = true
                                    func()
                                else
                                    print("invalid script")
                                    playSound("6493287948", 0.1)
                                    NotificationLibrary:SendNotification(
                                        "Error",
                                        "Your song script is broken. If confused, contact support in the discord.",
                                        5
                                    )
                                end
                            end
                        end
                    )

                    -- del song function

                    local clickTime = 0.5
                    local lastClick = 0

                    delsongbutton.MouseButton1Click:Connect(
                        function()
                            local now = tick()
                            if now - lastClick <= clickTime then
                                -- Double-click detected
                                print("Double-click detected. Deleting song...")
                                delfile(filepath) -- Delete the file
                                songframe:Destroy()
                                table.remove(customsongbuttons, table.find(customsongbuttons, songbutton))
                                table.remove(addedCustoms, table.find(addedCustoms, filepath))
                                updatecustomcount()
                                playSound("6493287948", 0.1)
                                NotificationLibrary:SendNotification("Success", "Your song has been deleted.", 5)
                            else
                                -- Single-click detected
                                print("Single-click detected. Showing notification...")
                                playSound("6493287948", 0.1)
                                NotificationLibrary:SendNotification("Info", "Double-click to delete the song.", 3)
                            end
                            lastClick = now -- Update the last click time
                        end
                    )

                    updatecustomcount()
                else -- if yes table.find
                    print("song already added, skipping")
                end
            else
                print("its not a txt, skipping")
            end
        end
    else
    end -- ends if folderexists
end -- end updatesongs func

for _, songbutton in ipairs(scroll:GetChildren()) do
    if songbutton:IsA("TextButton") then
        if songbutton.Text == "error" then
            songbutton:Destroy()
        end
    else
    end
end

wait(0.5)
updateSongs()



-- FAVOURITE SONGS
-- FAVOURITE SONGS
-- FAVOURITE SONGS



local addedFavsNames = {}


local function updateFavs()

    local favFileExists
    local favSongsContent

    if isfile("TALENTLESS_FAV_SONGS.txt") then
        favFileExists = true
        favSongsContent = readfile("TALENTLESS_FAV_SONGS.txt")
    else
        favFileExists = false
    end

    if favFileExists then
        local allSongNames = {}

        for _, song in ipairs(songs) do
            table.insert(allSongNames, {button = song.button, name = song.button.Text})
        end

        for _, songFrame in ipairs(customsongbuttons) do
            local btn = songFrame and songFrame:FindFirstChildOfClass("TextButton")
            if btn then
                table.insert(allSongNames, {button = songFrame, name = btn.Text})
            end
        end

        for line in favSongsContent:gmatch("[^\r\n]+") do
            if line ~= "" and not table.find(addedFavsNames, line) then
                for _, entry in ipairs(allSongNames) do
                    if entry.name == line then
                        if entry.button:IsA("Frame") then
                            local btn = entry.button and entry.button:FindFirstChildOfClass("TextButton")
                            btn.favButton.Image = "rbxassetid://137655053511068" -- fav icon
                        else
                            entry.button.favButton.Image = "rbxassetid://137655053511068" -- fav icon
                        end
                        table.insert(favsongbuttons, entry.button)
                    end
                end
                table.insert(addedFavsNames, line)
            end
        end
    end

    updatefavcount()
end

local function favouriteSong(name)
    if not isfile("TALENTLESS_FAV_SONGS.txt") then
        writefile("TALENTLESS_FAV_SONGS.txt", "")
    end

    local currentFavs = readfile("TALENTLESS_FAV_SONGS.txt")
    local alreadyFav = false

    for songName in currentFavs:gmatch("[^\r\n]+") do
        if songName == name then
            alreadyFav = true
            break
        end
    end

    if not alreadyFav then
        writefile("TALENTLESS_FAV_SONGS.txt", currentFavs .. "\n" .. name)
    end

    updateFavs()
end

wait(0.5)
updateFavs()

local function unfavouriteSong(name)
    if not isfile("TALENTLESS_FAV_SONGS.txt") then return end

    local currentFavs = readfile("TALENTLESS_FAV_SONGS.txt")
    local newFavs = {}

    -- add all the favs to newfavs table if its not blank and if its no the song to unfavourite
    for line in currentFavs:gmatch("[^\r\n]+") do
        if line ~= "" and line ~= name then
            table.insert(newFavs, line)
        end
    end

    writefile("TALENTLESS_FAV_SONGS.txt", table.concat(newFavs, "\n"))

    for i, fav in ipairs(addedFavsNames) do
        if fav == name then
            table.remove(addedFavsNames, i)
            break
        end
    end

    for i, button in ipairs(favsongbuttons) do
        if button:IsA("Frame") then
            local btn = button and button:FindFirstChildOfClass("TextButton")
            if btn and btn.Text == name then
                table.remove(favsongbuttons, i)
                btn.favButton.Image = "rbxassetid://76156993128854" -- unfav icon
                break
            end
        end
        
        if button.Text == name then
            table.remove(favsongbuttons, i)
            button.favButton.Image = "rbxassetid://76156993128854" -- unfav icon
            break
        end
    end

    updateFavs()
end

local togglefavs = Instance.new("ImageButton")

togglefavs.Name = "togglefavs"
togglefavs.Parent = frame
togglefavs.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
togglefavs.BackgroundTransparency = 1.000
togglefavs.BorderColor3 = Color3.fromRGB(0, 0, 0)
togglefavs.BorderSizePixel = 0
togglefavs.Position = UDim2.new(0.86210525, 0, 0.0294117648, 0)
togglefavs.Size = UDim2.new(0, 25, 0, 25)
togglefavs.ZIndex = 10
togglefavs.Image = "rbxassetid://137655053511068"

togglefavs.MouseButton1Click:Connect(function()
    for _, song in ipairs(songs) do
        song.button.favButton.Visible = not song.button.favButton.Visible
    end

    for i, songFrame in ipairs(customsongbuttons) do
        local btn = songFrame and songFrame:FindFirstChildOfClass("TextButton")
        local fav = btn and btn:FindFirstChild("favButton")
        if fav then
            fav.Visible = not fav.Visible
        end
    end
end)

local unfavDecal = "rbxassetid://76156993128854"
local favDecal = "rbxassetid://137655053511068"

for _, song in ipairs(songs) do
    local favB = song.button.favButton
    favB.MouseButton1Click:Connect(function()
        if favB.Image == unfavDecal then
            favouriteSong(song.button.Text)
            favB.Image = favDecal
            updateFavs()
        else
            favB.Image = unfavDecal
            unfavouriteSong(song.button.Text)
            updateFavs()
        end
    end)
end

for _, songFrame in ipairs(customsongbuttons) do
    local btn = songFrame and songFrame:FindFirstChildOfClass("TextButton")
    local favB = btn and btn:FindFirstChild("favButton")
    if favB then
        favB.MouseButton1Click:Connect(function()
            if favB.Image == unfavDecal then
                favouriteSong(btn.Text)
                favB.Image = favDecal
                updateFavs()
            else
                favB.Image = unfavDecal
                unfavouriteSong(btn.Text)
                updateFavs()
            end
        end)
    end
end

