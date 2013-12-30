#include "stdafx.h"
#include "OpenFauxBar.h"

COpenFauxBar::COpenFauxBar(): 
	m_dwBandID(0), 
	m_hWndParent(NULL)
{
}

BOOL COpenFauxBar::RegisterAndCreateWindow()
{
	RECT rect;
	::GetClientRect(m_hWndParent, &rect);

	m_toolbar.CreateToolbarWindow(m_hWndParent, rect);
	m_toolbar.SetFocus();
	return m_toolbar.IsWindow();
}

STDMETHODIMP COpenFauxBar::GetBandInfo(DWORD dwBandID, DWORD dwViewMode, DESKBANDINFO* pdbi)
{
	m_dwBandID = dwBandID;

	if (pdbi)
	{
		if (pdbi->dwMask & DBIM_MINSIZE)
		{
			pdbi->ptMinSize.x = 140;
			pdbi->ptMinSize.y = 25;
		}
		if (pdbi->dwMask & DBIM_MAXSIZE)
		{
			pdbi->ptMaxSize.x = 140;
			pdbi->ptMaxSize.y = 25;
		}
		if (pdbi->dwMask & DBIM_INTEGRAL)
		{
			pdbi->ptIntegral.x = 140;
			pdbi->ptIntegral.y = 25;
		}
		if (pdbi->dwMask & DBIM_ACTUAL)
		{
			pdbi->ptActual.x = 140;
			pdbi->ptActual.y = 25;
		}
		if (pdbi->dwMask & DBIM_BKCOLOR)
		{
			//pdbi->dwMask &= ~DBIM_BKCOLOR;
		}
		if (pdbi->dwMask & DBIM_MODEFLAGS)
		{
			//pdbi->dwModeFlags = DBIMF_VARIABLEHEIGHT;
		}
	}
	return S_OK;
}

STDMETHODIMP COpenFauxBar::CloseDW(unsigned long dwReserved)
{
	m_toolbar.ShowWindow(SW_HIDE);
	return S_OK;
}

STDMETHODIMP COpenFauxBar::ResizeBorderDW(const RECT* prcBorder, IUnknown* punkToolbarSite, BOOL fReserved)
{
	return E_NOTIMPL;
}

STDMETHODIMP COpenFauxBar::ShowDW(BOOL fShow)
{
	m_toolbar.ShowWindow(fShow ? SW_SHOW : SW_HIDE);
	return S_OK;
}

STDMETHODIMP COpenFauxBar::GetWindow(HWND* phwnd)
{
	if (NULL == phwnd)
		return E_INVALIDARG;
	*phwnd = m_toolbar.m_hWnd;
	return S_OK;
}

static LRESULT CALLBACK windowProc(HWND hWnd, UINT uMsg,
									WPARAM wParam, LPARAM lParam)
{
	COpenFauxBar* bar = (COpenFauxBar*)GetWindowLongPtr(hWnd, GWLP_USERDATA);
	if (uMsg == WM_COMMAND)
	{
		BOOL handled;
		bar->toolbar().OnCommand(uMsg, wParam, lParam, handled);
	}
	return CallWindowProc(bar->rebarWinproc(), hWnd, uMsg, wParam, lParam);
} 

STDMETHODIMP COpenFauxBar::SetSite(IUnknown* pUnkSite)
{
	if (pUnkSite != NULL)
	{
		CComPtr<IOleWindow> pOleWindow = NULL;

		m_hWndParent = NULL;

		if(SUCCEEDED(pUnkSite->QueryInterface(IID_IOleWindow, (LPVOID*)&pOleWindow)))
		{
			pOleWindow->GetWindow(&m_hWndParent);
		}

		if(!::IsWindow(m_hWndParent))
			return E_FAIL;

		if(!RegisterAndCreateWindow())
			return E_FAIL;

		SetWindowLongPtr(m_hWndParent, GWLP_USERDATA, (LONG_PTR)this);
		m_rebarWinproc = (WNDPROC)GetWindowLongPtr(m_hWndParent, GWLP_WNDPROC);
		SetWindowLongPtr(m_hWndParent, GWLP_WNDPROC, (LONG_PTR)windowProc); 
	}
	else
	{
		SetWindowLongPtr(m_hWndParent, GWLP_USERDATA, (LONG_PTR)NULL);
		SetWindowLongPtr(m_hWndParent, GWLP_WNDPROC, (LONG_PTR)m_rebarWinproc); 
	}

	return IObjectWithSiteImpl<COpenFauxBar>::SetSite(pUnkSite);
}


