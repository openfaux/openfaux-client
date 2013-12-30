#include "stdafx.h"
#include "Resource.h"
#include "OpenFauxToolbar.h"
#include "PngImage.h"

COpenFauxToolbar::COpenFauxToolbar()
	: m_hImageList(NULL)
	, m_bEnabled(TRUE)
{
	INITCOMMONCONTROLSEX icex;
	icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
	icex.dwICC  = ICC_BAR_CLASSES;
	InitCommonControlsEx(&icex);
}

COpenFauxToolbar::~COpenFauxToolbar()
{
	ImageList_Destroy(m_hImageList);
	if (IsWindow()) DestroyWindow();
}

extern HINSTANCE GlobHInstance;

LRESULT COpenFauxToolbar::OnCreate(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
{
	::SendMessage(m_hWnd, TB_SETEXTENDEDSTYLE, 0, (LPARAM)TBSTYLE_EX_MIXEDBUTTONS);
	::SendMessage(m_hWnd, TB_SETEXTENDEDSTYLE, 0, (LPARAM)TBSTYLE_EX_DOUBLEBUFFER);
	::SendMessage(m_hWnd, TB_BUTTONSTRUCTSIZE, sizeof(TBBUTTON), 0);
	::SendMessage(m_hWnd, TB_SETMAXTEXTROWS, 1, 0L);

	int idxOnline = ::SendMessage(m_hWnd, TB_ADDSTRING, 0,(LPARAM)L"OpenFaux (on)");
	int idxOffline = ::SendMessage(m_hWnd, TB_ADDSTRING, 0,(LPARAM)L"OpenFaux (off)");

	CPngImage img1;
	img1.LoadFromResource(GlobHInstance,IDB_PNG1);
	CPngImage img2;
	img2.LoadFromResource(GlobHInstance,IDB_PNG2);
	HBITMAP hbOnline = (HBITMAP)img1;
	HBITMAP hbOffline = (HBITMAP)img2;
	
	#define RGBA(r,g,b,a) ((COLORREF)(((BYTE)(r)|((WORD)((BYTE)(g))<<8))|(((DWORD)(BYTE)(b))<<16)|(((DWORD)(BYTE)(a))<<24)))

	COLORREF crMask = RGBA(1, 1, 1, 1);
	m_hImageList = ImageList_Create(15, 19, ILC_COLOR32|ILC_MASK, 2, 0);
	ImageList_AddMasked(m_hImageList, hbOffline, crMask);
	ImageList_AddMasked(m_hImageList, hbOnline, crMask);
	::SendMessage(m_hWnd, TB_SETIMAGELIST, 0, (LPARAM)m_hImageList);

	TBBUTTON Button;
	ZeroMemory((void*)&Button, sizeof(TBBUTTON));
	Button.idCommand = IDM_ENABLE_TOOLBAR;
	Button.fsState = TBSTATE_ENABLED;
	Button.fsStyle = BTNS_BUTTON | BTNS_AUTOSIZE;
	Button.dwData = 0;
	Button.iString = m_bEnabled ? idxOnline : idxOffline;
	Button.iBitmap = m_bEnabled ? 0 : 1;
	
	::SendMessage(m_hWnd, TB_INSERTBUTTON, 0, (LPARAM)&Button);
	::SendMessage(m_hWnd, TB_AUTOSIZE, 0, 0); 

	::ShowWindow(m_hWnd, TRUE);

	return 0;
}

LRESULT COpenFauxToolbar::OnSize(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
{
	::SendMessage(m_hWnd, TB_AUTOSIZE, 0, 0);
	return 0;
}

LRESULT COpenFauxToolbar::OnCommand(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
{
	if (uMsg == WM_COMMAND)
	{
		long cmd = LOWORD(wParam);
		if (cmd == IDM_ENABLE_TOOLBAR) {
			setEnabledState(!m_bEnabled);
		}
	}

	return -1;
}

void COpenFauxToolbar::setEnabledState(BOOL state)
{
	m_bEnabled = state;
	::SendMessage(m_hWnd, TB_CHANGEBITMAP, IDM_ENABLE_TOOLBAR, m_bEnabled ? 0 : 1);

	TBBUTTONINFO info = {0};
	info.cbSize = sizeof(TBBUTTONINFO);
	info.dwMask = TBIF_TEXT;
	info.pszText = m_bEnabled ? L"OpenFaux (on)" : L"OpenFaux (off)";

	::SendMessage(m_hWnd, TB_SETBUTTONINFO, IDM_ENABLE_TOOLBAR, (LPARAM)&info);
}

void COpenFauxToolbar::CreateToolbarWindow(HWND hwnd, RECT rect)
{
	DWORD style = WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | 
				TBSTYLE_TRANSPARENT | TBSTYLE_LIST | TBSTYLE_FLAT | TBSTYLE_TOOLTIPS |
				CCS_NODIVIDER | CCS_NORESIZE | CCS_NOPARENTALIGN;
	DWORD extra = 0;//WS_EX_LEFT | WS_EX_RIGHTSCROLLBAR | WS_EX_TOOLWINDOW;
	
	Create(hwnd, rect, NULL, style, extra);
}
